import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

export async function collectGithub() {
  console.log('[GitHub] GitHubトレンドおよびリリース情報の収集を開始します...');
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  // 1. Trending Repositories (finally によるブラウザ解放)
  const repos = [];
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://github.com/trending?since=weekly', { waitUntil: 'domcontentloaded', timeout: 20000 });
    const extracted = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('article.Box-row')).slice(0, 3);
      return rows.map(r => {
        const titleAnchor = r.querySelector('h2 a');
        const descEl = r.querySelector('p');
        const repoName = titleAnchor ? titleAnchor.innerText.replace(/\s+/g, '').trim() : '';
        const url = titleAnchor ? titleAnchor.href : '';
        const desc = descEl ? descEl.innerText.trim() : '';
        return { repoName, url, desc };
      });
    });
    repos.push(...extracted);
  } catch (e) {
    console.warn(`[GitHub] Trending 取得エラー: ${e.message}`);
  } finally {
    if (browser) await browser.close();
  }

  // Save Trending Repositories
  let trendingMd = `# 注目のAI開発リポジトリ - ${today}\n\n`;
  if (repos.length === 0) {
    trendingMd += '今週注目すべきリポジトリは取得できませんでした。\n';
  } else {
    repos.forEach(r => {
      trendingMd += `### [${r.repoName}](${r.url})\n`;
      trendingMd += `- **概要**: ${r.desc || 'AI開発に関連する注目のリポジトリです。'}\n`;
      trendingMd += `- **注目ポイント**: 今週GitHubでスター数が急増している注目のプロジェクトです。\n\n`;
    });
  }
  await fs.writeFile(path.join(outputDir, 'trending_repositories.md'), trendingMd, 'utf-8');

  // 2. Release Information (GitHub APIによる動的取得)
  const targetRepos = [
    { owner: 'google-gemini', repo: 'gemini-cli' },
    { owner: 'anthropics', repo: 'claude-code' },
    { owner: 'cline', repo: 'cline' }
  ];

  let releaseMd = `# リリリース情報 - ${today}\n\n`;

  for (const item of targetRepos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${item.owner}/${item.repo}/releases/latest`, {
        headers: { 'User-Agent': 'weekly-ai-dev-bot' }
      });
      if (res.ok) {
        const data = await res.json();
        releaseMd += `### [${item.owner}/${item.repo}](${data.html_url})\n`;
        releaseMd += `- **タグ**: ${data.tag_name}\n`;
        releaseMd += `- **リリース日**: ${data.published_at ? data.published_at.split('T')[0] : '不明'}\n`;
        releaseMd += `- **概要**: ${data.name || '最新リリース'}\n\n`;
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (e) {
      console.warn(`[GitHub] ${item.owner}/${item.repo} リリリース取得警告: ${e.message}`);
      releaseMd += `### [${item.owner}/${item.repo}](https://github.com/${item.owner}/${item.repo})\n`;
      releaseMd += `- **最新情報**: 最新リリースの取得に失敗しました。直接ページを参照してください。\n\n`;
    }
  }

  await fs.writeFile(path.join(outputDir, 'release_information.md'), releaseMd, 'utf-8');
  console.log(`[GitHub] 出力完了: trending_repositories.md / release_information.md`);
}

if (process.argv[1] && process.argv[1].endsWith('github.js')) {
  collectGithub().catch(console.error);
}