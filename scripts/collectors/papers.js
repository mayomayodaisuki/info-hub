import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

function getISOWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export async function collectPapers() {
  console.log('[Papers] 論文情報の収集を開始します...');
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];
  const weekStr = getISOWeekNumber(new Date());

  let browser;
  const papers = [];

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const hfUrl = `https://huggingface.co/papers/week/${weekStr}`;
    await page.goto(hfUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });

    const paperLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href^="/papers/"]'));
      const unique = new Map();
      anchors.forEach(a => {
        const title = (a.innerText || '').trim();
        const href = a.href;
        if (title && !href.endsWith('/papers/') && !unique.has(href)) {
          unique.set(href, title);
        }
      });
      return Array.from(unique.entries()).slice(0, 3).map(([href, title]) => ({ href, title }));
    });

    for (const paper of paperLinks) {
      await page.goto(paper.href, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const arXivUrl = await page.evaluate(() => {
        const arxivAnchor = document.querySelector('a[href*="arxiv.org/abs/"]');
        return arxivAnchor ? arxivAnchor.href : null;
      });

      let abstractText = 'arXiv アブストラクトの自動取得に失敗しました。詳細ページを参照してください。';
      if (arXivUrl) {
        let arxivPage;
        try {
          arxivPage = await browser.newPage();
          await arxivPage.goto(arXivUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
          abstractText = await arxivPage.evaluate(() => {
            const absBlock = document.querySelector('blockquote.abstract');
            return absBlock ? absBlock.innerText.replace(/^Abstract:\s*/i, '').trim() : '';
          });
        } catch (e) {
          console.warn(`[Papers] arXiv 取得警告: ${e.message}`);
        } finally {
          if (arxivPage) await arxivPage.close();
        }
      }

      papers.push({
        title: paper.title,
        authors: 'Hugging Face Community Trending Authors',
        summary: abstractText.slice(0, 300) + '...',
        arxivUrl: arXivUrl || paper.href
      });
    }
  } catch (err) {
    console.error(`[Papers] 取得エラー: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }

  let markdown = `# 今週のAI論文トレンド - ${today}\n\n`;
  if (papers.length === 0) {
    markdown += '今週は注目すべきトレンド論文が収集できませんでした。\n';
  } else {
    papers.forEach((p, idx) => {
      markdown += `${idx + 1}. **タイトル:** ${p.title}\n`;
      markdown += `   **著者:** ${p.authors}\n`;
      markdown += `   **概要:** ${p.summary}\n`;
      markdown += `   **arXiv:** ${p.arxivUrl}\n\n`;
    });
  }

  const filePath = path.join(outputDir, 'ai_trending_papers.md');
  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`[Papers] 出力完了: ${filePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('papers.js')) {
  collectPapers().catch(console.error);
}