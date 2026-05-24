# AI News Summary - 2026-05-24

## Major Announcements

### Google
- **Title**: Google I/O 2026 — Gemini 3.5 Flash、Antigravity 2.0、Managed Agents を発表
- **Date**: 2026-05-19
- **Source**: https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
- **Summary**: Google I/O 2026（5月19日開催）で、エージェント／コーディング向けに最適化された Gemini 3.5 Flash を発表当日に一般提供開始した。Terminal-Bench 2.1 で76.2%、MCP Atlas で83.6%を記録し、従来のフロンティアモデルより約4倍高速で、Gemini 3.1 Pro をコーディング・ツール利用ベンチで上回る。価格は入力 $1.50/100万トークン、出力 $9.00/100万トークン（キャッシュ入力 $0.15）、コンテキストは約100万入力トークン。Gemini API、AI Studio、Vertex AI、Antigravity で同日提供。
- **開発者への影響**: 高速かつ低コストなエージェント／コーディング特化モデルが API で即日利用可能になり、関数呼び出し・構造化出力・コード実行・search-as-a-tool を標準サポート。動的thinkingがデフォルトで有効なため、エージェント・自動化ワークフローのコスト効率と応答速度の両立が進む。
- **Product page**: https://ai.google.dev/gemini-api/docs/changelog

### Google
- **Title**: Google Antigravity 2.0 — エージェントファーストの開発プラットフォーム（CLI / SDK / Managed Agents）
- **Date**: 2026-05-19
- **Source**: https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
- **Summary**: 2025年11月版を全面的に作り直した Antigravity 2.0 を I/O 2026 で発表。スタンドアロンのデスクトップアプリ（複数エージェントの並列オーケストレーション、動的サブエージェント、スケジュール実行）に加え、ターミナル向けの Antigravity CLI、自前インフラに配置できる Antigravity SDK、Gemini API 上の Managed Agents（隔離された Google ホストの Linux サンドボックスでステートフルなエージェントを実行）を提供。
- **開発者への影響**: 単一の API 呼び出しで隔離環境のエージェントを起動でき、推論・ツール利用・コード実行を任せられる。CLI／SDK の追加で GUI を介さないエージェント開発や、自社プロダクトと同じエージェントハーネスへのプログラム的アクセスが可能になり、本番運用を見据えたエージェント実装の選択肢が広がる。
- **Product page**: https://techcrunch.com/2026/05/19/google-launches-antigravity-2-0-with-an-updated-desktop-app-and-cli-tool-at-io-2026/

### Anthropic
- **Title**: Anthropic が SDK / MCP サーバー生成ツールの Stainless を買収
- **Date**: 2026-05-18
- **Source**: https://www.anthropic.com/news/anthropic-acquires-stainless
- **Summary**: API 仕様から TypeScript・Python・Go・Java などの SDK／CLI／MCP サーバーを生成する Stainless を買収（5月18日完了）。Stainless は2022年創業で、Anthropic の公式 SDK を初期から支えてきたほか OpenAI や Google も利用していた。Anthropic はホスト型 Stainless 製品（自動 SDK ジェネレーター等）を段階的に終了する方針で、既存顧客は生成済み SDK の所有権と改変権を保持する。
- **開発者への影響**: Claude のエージェント／API 連携基盤としての SDK・MCP ツール生成能力が Anthropic に内製化される。一方でホスト型ジェネレーターは終了予定のため、Stainless をマルチプロバイダの SDK 生成に使っていたチームは移行計画の検討が必要になる。
- **Product page**: https://techcrunch.com/2026/05/18/anthropic-has-acquired-the-dev-tools-startup-used-by-openai-google-and-cloudflare/

### OpenAI
- **Title**: エンタープライズ向け Secure MCP Tunnel をリリース
- **Date**: 2026-05-19
- **Source**: https://developers.openai.com/api/docs/changelog
- **Summary**: OpenAI API のチェンジログに、エンタープライズ顧客向けの Secure MCP Tunnel が5月19日付で追加された。MCP（Model Context Protocol）サーバーへの安全な接続経路を提供する機能で、社内システムやプライベートなツールをエージェントに安全に接続することを狙う。
- **開発者への影響**: 自社インフラ内の MCP サーバーを公開せずにエージェントから利用できるようになり、エンタープライズ環境でのツール連携・社内データ接続のセキュリティ要件を満たしやすくなる。
- **Product page**: https://developers.openai.com/api/docs/changelog

## Other Notable Updates

### Microsoft Research
- **Title**: MagenticLite / MagenticBrain / Fara1.5 — 小型モデル向けエージェント体験
- **Date**: 2026-05-21
- **Source**: https://www.microsoft.com/en-us/research/blog/
- **Summary**: 小型モデルで動作するエージェントシステム MagenticLite を発表。ブラウザ操作とローカルファイルシステムを単一のワークフローで横断的に扱える。Fara1.5 などを含む、軽量環境でのエージェント実行に最適化した取り組み。
- **開発者への影響**: 大型フロンティアモデルに依存せず、ローカルや低リソース環境でもブラウザ・ファイル操作を伴うエージェントを構築できる選択肢が広がる。

### Hugging Face（オープンソース）
- **Title**: Ettin Reranker Family / PaddleOCR 3.5 / Open Agent Leaderboard / Nemotron-Labs Diffusion LM
- **Date**: 2026-05-18 〜 2026-05-23
- **Source**: https://huggingface.co/blog
- **Summary**: 検索・ランキング向けの Ettin Reranker ファミリー（5/19）、Transformers バックエンドで OCR・文書解析を実行する PaddleOCR 3.5（5/18）、エージェント評価のための Open Agent Leaderboard（IBM Research、5/18）、NVIDIA による拡散言語モデル Nemotron-Labs Diffusion LM（5/23）など、開発者向けのオープンソースモデル・ツールが多数公開された。
- **開発者への影響**: RAG のリランキング、文書パースパイプライン、エージェント評価などの実装に直接組み込めるオープンなモデル／ベンチマークが追加され、自前構築の選択肢が増えた。

## Source References

1. OpenAI Blog — https://openai.com/blog （403によりWebSearch併用 / API Changelog: https://developers.openai.com/api/docs/changelog）
2. Google AI Blog — https://ai.googleblog.com/ （現行: https://research.google/blog/ / Gemini API Changelog: https://ai.google.dev/gemini-api/docs/changelog）
3. Anthropic News — https://www.anthropic.com/news
4. Meta AI — https://ai.meta.com/blog/ （対象期間内の該当ニュースなし）
5. Microsoft Research — https://www.microsoft.com/en-us/research/blog/
6. DeepMind — https://deepmind.google/discover/blog/
7. Hugging Face Blog — https://huggingface.co/blog
