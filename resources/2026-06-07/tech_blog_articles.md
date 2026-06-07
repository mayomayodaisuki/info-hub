# Japanese Tech Blog Articles - 2026-06-07

対象期間: 2026-05-31 〜 2026-06-07（直近7日間）

## Featured Articles

### 1. [Claude Managed Agentsで「まずエンジニアに聞こう」を「まずbotに聞こう」に変えた](https://zenn.dev/dinii/articles/d7be3acc43d868)
- **著者**: marin_a___ (Dinii)
- **プラットフォーム**: Zenn
- **公開日**: 2026-06-04
- **いいね数**: 155
- **概要**: Dinii社で日次8件ほど発生していた「データ・ログ・コードを確認しないと答えられない」開発チームへの問い合わせを、Claude Managed Agentsを使った@ask-anything Slack botで自動化した事例。BigQuery・Cloud Logging・monorepo検索などのツールをbotが自律的に実行し、調査からログ確認・仕様確認までを完結させる。
- **開発者向けポイント**: Anthropicがホスト側でsandbox環境とcredential管理を担うため、自前実装すべきコードが3種類まで削減できた。導入4週間でbot回答スレッドが週24件→109件、dev-helpチケットが週40〜50件→20〜30件、エスカレーション率が100%→22%へ改善。
- **実装例**: Slack bot構成と複数ツール（BigQuery / Cloud Logging / コード検索）の連携設計を提示。

### 2. [開発者が攻撃対象になった時代に、開発環境とCI/CDについて考えていること](https://zenn.dev/catatsuy/articles/e2fc71d810613a)
- **著者**: catatsuy
- **プラットフォーム**: Zenn
- **公開日**: 2026-06-06
- **いいね数**: 71
- **概要**: AIコーディングの普及で開発者の裾野が広がる一方、GitHubトークンやcloud credentialといった強力な権限がサプライチェーン攻撃の標的になっている現状を論じた記事。「開発そのものを安全にする」ための環境・CI/CD設計の考え方を整理している。
- **開発者向けポイント**: 依存パッケージの厳選、`npm install`など危険操作の隔離、CI/CD実行状況の可視化が重要。cicd-sensorやTakumi Guard/Runner等のツールでeBPFによりプロセス・ファイル・通信を記録し、開発環境をクラウド/sandboxへ段階的に移行する方針を推奨。
- **実装例**: eBPFベースの監視ツールやsandbox隔離の具体的な構成例に言及。

### 3. [AIの成果はモデルの外側で決まる。Claude Code時代のハーネス設計、3つの判断軸と実践](https://note.com/yamamon_ai/n/nc8ccb04b0aeb)
- **著者**: やまもん
- **プラットフォーム**: note
- **公開日**: 2026-06-07
- **いいね数**: 2
- **概要**: AIの成果はモデル性能ではなく「外側の設計（ハーネス）」で決まると主張する記事。ハーネス設計の3本柱を「ツール連携」「計画」「記憶」と定義し、モデルを乗り換えるよりも大きな成果改善が得られるとする。
- **開発者向けポイント**: 品質チェックループの構築、過去の文脈・経験の蓄積、段階的なタスク分解設計に優先的に投資すべきという実践指針。Claude Codeを使う上での設計思想として有用。
- **実装例**: 品質チェックループとタスク分解の設計パターンを概念図で提示。

### 4. [Claude Code と Codex を使い比べて見えた設計思想の違い](https://zenn.dev/tark_ann/articles/e8b09c6db73bfb)
- **著者**: tark_ann
- **プラットフォーム**: Zenn
- **公開日**: 2026-06-06
- **いいね数**: 14
- **概要**: Claude CodeとCodexを実務で使い比べ、設計思想の違いを分析した記事。Claude Codeは「探索→計画→実装」で作業仮説との整合性を重視し、Codexは「読む→編集→実行」で実コード・実行結果との整合性を優先する傾向があるとまとめている。
- **開発者向けポイント**: 情報収集・整理はClaude Code、コード修正・実装検証はCodexと役割分担することで、問題空間の探索と解空間の実行を効率化できる。2大AIコーディングツールの使い分け指針として実践的。
- **実装例**: 具体的なワークフローの分担パターンを提示。

### 5. [AI駆動開発はここまで来た！Claude×FigmaMCPで1日アプリ制作](https://zenn.dev/sun_asterisk/articles/claude-figma-mcp-app)
- **著者**: reina_codes (Sun Asterisk)
- **プラットフォーム**: Zenn
- **公開日**: 2026-06-06
- **いいね数**: 9
- **概要**: 「PetSpot」（ペット同伴可能な場所を検索するWebアプリ）を、FigmaデザインをClaudeがMCP経由で直接参照しReact実装へ変換することで1日で制作した事例。デザイナーがFigmaで作成→Dev ModeのMCPセクションからプロンプトをコピー→Claudeに貼り付けてコード生成という流れ。
- **開発者向けポイント**: Figma MCPによって「余白」「コンポーネント構造」「レイアウト意図」をClaudeが直接参照でき、デザイン・実装間の往復修正を大幅削減。プロトタイピング速度が向上する。
- **実装例**: Figma MCPプラグインのインストール・認証手順とReactコード生成のワークフローを具体的に記載。

## Trending Topics
- **AIエージェント/ハーネス設計**: モデル性能よりもツール連携・計画・記憶といった「外側の設計」が成果を左右するという議論が活発（記事1, 3）。
- **Claude Code vs Codex の使い分け**: 2大AIコーディングツールの設計思想比較と役割分担が頻出テーマ（記事4）。
- **AI時代のセキュリティ**: 開発者権限を狙うサプライチェーン攻撃と、開発環境・CI/CDの防御設計への関心が高まっている（記事2）。
- **MCP（Model Context Protocol）の実用化**: Figma連携をはじめ、外部ツールとAIをMCPでつなぐ実装が一般化（記事5）。
- **AI駆動開発の運用フェーズ移行**: 「速く作る」から「安全に止められる/保守できる」設計へという成熟した議論（Zenn: rapls「AIに8割書かせたコードを半年後の自分が保守できるように」, note: fugusaka「速くする技術から止められる設計へ」）。

## Recommended Reading Order
1. **入門/概観**: [Claude Code と Codex を使い比べて見えた設計思想の違い](https://zenn.dev/tark_ann/articles/e8b09c6db73bfb) — 主要ツールの全体像と使い分けを把握。
2. **実装/実践**: [AI駆動開発はここまで来た！Claude×FigmaMCPで1日アプリ制作](https://zenn.dev/sun_asterisk/articles/claude-figma-mcp-app) — MCP連携の具体的なハンズオン。
3. **応用/運用**: [Claude Managed Agentsで「まずエンジニアに聞こう」を「まずbotに聞こう」に変えた](https://zenn.dev/dinii/articles/d7be3acc43d868) と [AIの成果はモデルの外側で決まる](https://note.com/yamamon_ai/n/nc8ccb04b0aeb) — エージェント運用とハーネス設計の高度な実践。組織導入を検討するなら [開発者が攻撃対象になった時代に](https://zenn.dev/catatsuy/articles/e2fc71d810613a) でセキュリティ面も補完。
