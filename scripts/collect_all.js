import { collectNews } from './collectors/news.js';
import { collectPapers } from './collectors/papers.js';
import { collectCommunity } from './collectors/community.js';
import { collectGithub } from './collectors/github.js';
import { collectTechBlogs } from './collectors/tech_blogs.js';
import { collectEvents } from './collectors/events.js';
import fs from 'fs';
import path from 'path';

function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (e) {
      console.warn('config.jsonの読み込みに失敗しました。デフォルト（weekly）を使用します。');
    }
  }
  return { mode: 'weekly' };
}

async function main() {
  const config = loadConfig();
  const mode = config.mode || 'weekly';
  console.log(`=== 全データ並列収集パイプラインを開始します (モード: ${mode}) ===`);
  const startTime = Date.now();

  const tasks = [
    { name: 'News', fn: collectNews },
    { name: 'Papers', fn: collectPapers },
    { name: 'Community', fn: collectCommunity },
    { name: 'GitHub', fn: collectGithub },
    { name: 'TechBlogs', fn: collectTechBlogs },
    { name: 'Events', fn: collectEvents }
  ];

  const results = await Promise.allSettled(
    tasks.map(async task => {
      try {
        await task.fn(config);
        return { name: task.name, status: 'SUCCESS' };
      } catch (err) {
        console.error(`[FAIL] ${task.name}: ${err.message}`);
        return { name: task.name, status: 'FAILED', error: err.message };
      }
    })
  );

  console.log('\n=== 収集結果サマリー ===');
  results.forEach(res => {
    if (res.status === 'fulfilled') {
      const val = res.value;
      console.log(`- ${val.name}: ${val.status}`);
    } else {
      console.log(`- REJECTED: ${res.reason}`);
    }
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n全タスク完了（所要時間: ${duration}s）`);
}

main().catch(err => {
  console.error('オーケストレーターで致命的エラーが発生しました:', err);
  process.exit(1);
});
