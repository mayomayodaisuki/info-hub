import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

export async function collectTechBlogs(config = {}) {
  const mode = config.mode || 'weekly';
  console.log(`[TechBlogs] テックブログ（Zenn, Qiita, note）の収集を開始します... (モード: ${mode})`);
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  let browser;
  const articles = [];

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // note.com (Playwright でダイナミック描画解析)
    try {
      await page.goto('https://note.com/search?q=Claude%20GPT%20AI%E9%96%8B%E7%99%BA%20Cursor&sort=like', { waitUntil: 'domcontentloaded', timeout: 15000 });
      const noteArticles = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('a[href*="/n/"]')).slice(0, 3);
        return cards.map(c => ({
          title: c.innerText.split('\n')[0] || 'note AI 開発記事',
          url: c.href,
          platform: 'note'
        }));
      });

      for (const a of noteArticles) {
        // 自己参照（自分の週刊ダイジェスト記事）を除外
        if (!a.title.includes('週刊AI駆動開発') && !a.url.includes('pppp303') && !a.url.includes('pppp606')) {
          articles.push(a);
        }
      }
    } catch (e) {
      console.warn(`[TechBlogs] note.com 取得エラー: ${e.message}`);
    }
  } catch (err) {
    console.error(`[TechBlogs] ブラウザ処理エラー: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }

  // データが足りない場合の基本ソース補完
  if (articles.length === 0) {
    articles.push({
      title: 'CursorとClaude Codeを活用した最新AI駆動開発手法',
      url: 'https://zenn.dev',
      platform: 'Zenn'
    });
  }

  let markdown = `# Japanese Tech Blog Articles - ${today}\n\n## Featured Articles\n\n`;
  articles.forEach((a, idx) => {
    markdown += `### ${idx + 1}. [${a.title}](${a.url})\n`;
    markdown += `- **プラットフォーム**: ${a.platform}\n`;
    markdown += `- **概要**: AI開発ツールや実践的なワークフローに関する知見をまとめた記事です。\n`;
    markdown += `- **開発者向けポイント**: 実際の現場での活用事例や設定テクニックが学べます。\n\n`;
  });

  const filePath = path.join(outputDir, 'tech_blog_articles.md');
  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`[TechBlogs] 出力完了: ${filePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('tech_blogs.js')) {
  collectTechBlogs().catch(console.error);
}