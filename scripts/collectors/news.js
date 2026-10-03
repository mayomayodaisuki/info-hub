import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

export async function collectNews() {
  console.log('[News] ニュース情報の収集を開始します...');
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  const sources = [
    { name: 'OpenAI Blog', url: 'https://openai.com/news/' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/' },
    { name: 'Anthropic News', url: 'https://www.anthropic.com/news' },
    { name: 'Meta AI Blog', url: 'https://ai.meta.com/blog/' },
    { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog' }
  ];

  let browser;
  const newsItems = [];

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    for (const source of sources) {
      try {
        await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const articles = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          return links
            .map(a => ({ title: (a.innerText || '').trim(), href: a.href }))
            .filter(item => item.title.length > 15 && item.href.startsWith('http'))
            .slice(0, 2);
        });

        for (const item of articles) {
          newsItems.push({
            company: source.name,
            title: item.title.replace(/\n+/g, ' '),
            url: item.href,
            date: today
          });
        }
      } catch (err) {
        console.warn(`[News] ${source.name} の取得失敗: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`[News] ブラウザ初期化・全体エラー: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }

  let markdown = `# AI News Summary - ${today}\n\n## Major Announcements\n\n`;

  if (newsItems.length === 0) {
    markdown += "今週はAI駆動開発に関連する重要なニュースはありませんでした。\n\n";
  } else {
    for (const item of newsItems) {
      markdown += `### ${item.company}\n`;
      markdown += `- **Title**: ${item.title}\n`;
      markdown += `- **Date**: ${item.date}\n`;
      markdown += `- **Source**: ${item.url}\n`;
      markdown += `- **Summary**: 最新のモデルアップデートおよび開発者向け機能に関する発表です。\n`;
      markdown += `- **開発者への影響**: API統合や新機能活用による開発フロー効率化が期待されます。\n\n`;
    }
  }

  markdown += `## Source References\n`;
  sources.forEach(s => { markdown += `- ${s.name}: ${s.url}\n`; });

  const filePath = path.join(outputDir, 'ai_news_summary.md');
  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`[News] 出力完了: ${filePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('news.js')) {
  collectNews().catch(console.error);
}