import fs from 'fs/promises';
import path from 'path';

function getTodayDir() {
  const today = new Date().toISOString().split('T')[0];
  return path.join(process.cwd(), 'resources', today);
}

export async function collectEvents(config = {}) {
  const mode = config.mode || 'weekly';
  console.log(`[Events] Connpass イベント情報の収集を開始します... (モード: ${mode})`);
  const outputDir = getTodayDir();
  await fs.mkdir(outputDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  const events = [];

  try {
    const query = encodeURIComponent('AI開発');
    const res = await fetch(`https://connpass.com/api/v1/event/?keyword=${query}&order=2&count=3`);
    if (res.ok) {
      const data = await res.json();
      data.events.forEach(e => {
        events.push({
          title: e.title,
          url: e.event_url,
          organizer: e.series ? e.series.title : 'Connpass Group',
          startedAt: e.started_at ? e.started_at.split('T')[0] : '近日開催'
        });
      });
    }
  } catch (e) {
    console.warn(`[Events] API 取得失敗: ${e.message}`);
  }

  let markdown = `# AI Development Events - ${today}\n\n## Upcoming Events (Next 7 Days)\n\n`;

  if (events.length === 0) {
    markdown += '今週は注目すべきAI開発イベントが見つかりませんでした。\n';
  } else {
    events.forEach((ev, idx) => {
      markdown += `### Event ${idx + 1}: [${ev.title}](${ev.url})\n`;
      markdown += `- **主催者**: ${ev.organizer}\n`;
      markdown += `- **日時**: ${ev.startedAt}\n`;
      markdown += `- **概要**: AI技術および開発実践に関するセミナー・勉強会です。\n`;
      markdown += `- **開発者向けポイント**: 最新ツールのデモや実践ノウハウを収集できます。\n\n`;
    });
  }

  const filePath = path.join(outputDir, 'events.md');
  await fs.writeFile(filePath, markdown, 'utf-8');
  console.log(`[Events] 出力完了: ${filePath}`);
}

if (process.argv[1] && process.argv[1].endsWith('events.js')) {
  collectEvents().catch(console.error);
}