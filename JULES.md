# JULES.md - Guidelines for Google Jules AI Agent

This document defines the architecture, workflows, web-scraping constraints, and self-healing rules for Google Jules when working in this repository.

---

## 1. Project Overview & Directory Structure

This project automatically collects weekly AI development information and generates digest articles formatted for Zenn/Note publication.

```
├── scripts/
│   ├── collect_all.js            # Parallel execution orchestrator
│   └── collectors/               # Independent Node.js / Playwright collectors
│       ├── news.js               # OpenAI, Google AI, Anthropic news
│       ├── papers.js             # Hugging Face & arXiv trending papers
│       ├── community.js          # Hacker News & Reddit (old.reddit.com)
│       ├── github.js             # Trending repos & release information (GitHub API)
│       ├── tech_blogs.js         # Zenn, Qiita, note.com
│       └── events.js             # Connpass AI development events
├── resources/
│   └── YYYY-MM-DD/               # Directory created per run date
│       ├── ai_news_summary.md
│       ├── ai_trending_papers.md
│       ├── community_discussions.md
│       ├── trending_repositories.md
│       ├── release_information.md
│       ├── tech_blog_articles.md
│       └── events.md
├── articles/
│   └── weekly_ai_YYYYMMDD.md     # Generated Markdown article for publication
├── tests/
│   └── promptfoo/                # Guardrail & safety tests
├── package.json
└── JULES.md
```


---

## 2. Scraping Constraints & Workarounds

When collecting data, Jules must respect the following deterministic constraints:

1. **Reddit Scraping (`old.reddit.com`)**:
   - `www.reddit.com` uses Google reCAPTCHA Enterprise challenge, blocking headless Playwright browsers.
   - **MUST use `old.reddit.com`** for scraping top weekly threads.
   - **URL Normalization Requirement**: Convert all scraped links from `old.reddit.com` back to `www.reddit.com` in output files.
2. **`note.com` Access**:
   - `note.com` blocks simple HTTP `fetch` requests (returns 403 or empty CSS/JS).
   - Use Playwright with headless Chromium and proper `userAgent` headers.
3. **Self-Reference Prevention**:
   - Exclude articles with titles containing `"週刊AI駆動開発"` or URLs containing author `pppp303` / `pppp606` to avoid self-referencing in `tech_blogs.js`.
4. **Token & Resource Efficiency**:
   - Page interactions in Playwright must ALWAYS use `try { ... } finally { if (browser) await browser.close(); }` blocks to prevent zombie processes.

---

## 3. Standard Workflow Steps

When assigned a task to run or maintain the weekly digest pipeline, execute these standard steps in order:

1. **Execute Data Collection**:
   ```bash
   npm run collect:all
   ```
   Verify that Markdown files are created under resources/YYYY-MM-DD/.

2. **Generate Weekly Article**:
   - Read all Markdown files generated in resources/YYYY-MM-DD/.
   - Synthesize and output the final article into articles/weekly_ai_YYYYMMDD.md.
   - **Frontmatter Standard**: Ensure the file begins with standard Zenn frontmatter:
     ```yaml
     ---
     title: "週刊AI駆動開発ダイジェスト (YYYY/MM/DD号)"
     emoji: "🤖"
     type: "tech"
     topics: ["ai", "github", "llm", "claude", "gemini"]
     published: false
     ---
     ```
   - **Section Order**:
     1. 🚀 今週のハイライト (Summary of top 3 impactful updates)
     2. 📰 主要AIニュース＆モデル発表
     3. 📄 注目論文・研究開発
     4. 🌐 海外コミュニティ動向 (HN / Reddit)
     5. 📈 GitHubトレンド＆最新リリース
     6. 💻 日本国内技術ブログ・イベント
   - **Exclusion Rule**: Completely omit any sections that lack updates or failed to gather data. Never output placeholder text like "データが取得できませんでした" or "No updates found" in the final published article.

3. **Format & Fix AI Writing Quality**:
   ```bash
   npm run lint:fix
   ```
   This automatically removes hype language and adjusts Japanese punctuation via @textlint-ja/preset-ai-writing.

4. **Run Safety & Guardrail Tests**:
   ```bash
   npm run test:prompt
   ```
   Ensure all promptfoo test cases pass without safety or quality violations.

5. **Commit Changes & Open Pull Request**:
   - Stage resources/YYYY-MM-DD/ and articles/weekly_ai_YYYYMMDD.md.
   - Create a git commit and push to open a Pull Request.

---

## 4. Autonomous Self-Healing Rules

If any execution step fails (e.g., linting errors, build failures, or test crashes):

1. **Analyze Failure Log**: Parse stack traces, line numbers, and error output directly.
2. **Do NOT Halt Unnecessarily**: If a single web scraper fails in scripts/collect_all.js, verify that other files are collected properly and continue processing.
3. **Auto-Fix Code/Markdown**:
   - If textlint fails on formatting, fix the affected Markdown lines in articles/weekly_ai_YYYYMMDD.md autonomously.
   - If a Playwright selector changed, inspect the DOM structure, update scripts/collectors/*.js, and re-run npm run collect:all.
4. **Re-verify**: Always re-run npm run lint and npm run test:prompt after applying fixes to confirm resolution before pushing commits.