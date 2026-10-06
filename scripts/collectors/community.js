import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

export async function collectCommunity(config = {}) {
  const mode = config.mode || 'weekly';
  console.log(`[Community] コミュニティ動向の収集を開始します... (モード: ${mode})`);
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  const topics = [];
  const redditTimeframe = mode === 'daily' ? 'day' : 'week';
  const redditLimit = mode === 'daily' ? 1 : 2;

  // 1. Hacker News API (Algolia)
  try {
    const hitsCount = mode === 'daily' ? 2 : 3;
    const res = await fetch(`https://hn.algolia.com/api/v1/search?query=AI%20LLM%20Claude%20GPT&tags=story&hitsPerPage=${hitsCount}`);
    if (res.ok) {
      const data = await res.json();
      data.hits.forEach(hit => {
        topics.push({
          title: hit.title,
          url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
          source: 'Hacker News'
        });
      });
    }
  } catch (e) {
    console.warn(`[Community] HN取得警告: ${e.message}`);
  }

  // 2. Reddit (reCAPTCHA 回避のため old.reddit.com を使用し、finally でブラウザを確実に解放)
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    const subreddits = ['LocalLLaMA', 'MachineLearning'];
    for (const sub of subreddits) {
      try {
        await page.goto(`https://old.reddit.com/r/${sub}/top/?t=${redditTimeframe}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const posts = await page.evaluate((limit) => {
          const entries = Array.from(document.querySelectorAll('div.thing')).slice(0, limit);
          return entries.map(e => {
            const titleEl = e.querySelector('a.title');
            const permalink = e.getAttribute('data-permalink');
            return {
              title: titleEl ? titleEl.innerText : '',
              url: permalink ? `https://www.reddit.com${permalink}` : ''
            };
          });
        }, redditLimit);

        posts.forEach(p => {
          if (p.title && p.url) {
            topics.push({
              title: p.title,
              url: p.url,
              source: `Reddit (r/${sub})`
            });
          }
        });
      } catch (e) {
        console.warn(`[Community] Reddit r/${sub} 取得警告: ${e.message}`);
      }
    }
  } catch (err) {
    console.error(`[Community] Reddit ブラウザ処理エラー: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }

  let markdown = `# 海外コミュニティ動向 - ${today}\n\n## 注目のトピック\n\n`;
  topics.forEach(t => {
    markdown += `### [${t.title}](${t.url})\n`;
    markdown += `- **出典**: ${t.source}\n`;
    markdown += `- **注目ポイント**: コミュニティで高い関心を集めているトピックです。\n`;
    markdown += `- **技術的内容**: 最新のモデル検証、プロンプト、または開発環境に関する議論が含まれます。\n`;
    markdown += `- **開発者への示唆**: 開発における実践的なノウハウや選択肢として参考になります。\n\n`;
  });

  const filePath = path.join(outputDir, 'community_discussions.md');
  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`[Community] 出力完了: ${filePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('community.js')) {
  collectCommunity().catch(console.error);
}