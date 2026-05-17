# Japanese Tech Blog Articles - 2026-05-17

## Featured Articles

### 1. [Claude Code派だった僕がCodexに移る前に知りたかったこと](https://zenn.dev/gemcook/articles/e56eabc7ba2961)
- **著者**: MJ (gemcook)
- **プラットフォーム**: Zenn
- **公開日**: 2026-05-15
- **いいね数**: 非公開（トピック上位掲載）
- **概要**: Claude CodeからCodexへの移行を検討する開発者に向け、両者の根本的な違いを解説した記事。Codexは「OpenAI版Claude Code」ではなく、AIエージェントへ開発作業を委譲するための"運用コンソール"であると位置づけている。リポジトリルールが `CLAUDE.md` から `AGENTS.md` に変わる点、設定ファイルがJSONからTOMLになる点、そして「approval policy」と「sandbox mode」が承認タイミングと技術的アクセス境界を別軸で制御する仕組みを丁寧に整理している。
- **開発者向けポイ**: Codex移行時はCLAUDE.md→AGENTS.mdへ書き換える必要があり、承認制御とサンドボックス境界を分離して考えることが重要。設定資産の二重管理コストを意識すべき。
- **実装例**: `AGENTS.md` の記法、TOML設定例、`approval-policy` と `sandbox` 設定の組み合わせパターンを提示。

### 2. [Cursor 3.3 vs Claude Code — PRレビュー設計の判断基準](https://zenn.dev/miyan/articles/ai-code-cursor-claude-pr-review-2026)
- **著者**: dtakamiya (miyan)
- **プラットフォーム**: Zenn
- **公開日**: 2026-05-10
- **いいね数**: 非公開（トピック上位掲載）
- **概要**: Cursor Bugbot、Cursor Security Reviewer、Claude Codeの `/ultrareview` という3つのAIコードレビューツールを比較し、競合ではなく用途別の使い分けが必要であると主張する記事。ベンダー自社測定のベンチマーク（Bugbot 80%、Greptile 82%）に頼らず、自組織の実PRデータで30日パイロットを実施すべきという実践的な指針を示している。
- **開発者向けポイント**: `/ultrareview` はマルチエージェント並列検証で誤検知を構造的に減らすが、再現困難なバグでは見逃しリスクがある。データレジデンシー要件（ZDR、Bedrock/Vertex）次第で `/ultrareview` は使えないなど、料金やCI設定（複数レビュアーの排他制御）も含めた5軸評価が必要。
- **実装例**: 5評価軸のチェックリスト、`/ultrareview` 起動コマンド例、CIでの相互排他設定パターンを掲載。

### 3. [Codex vs Claude Code 2026 ── 判断軸とやらない判断](https://zenn.dev/miyan/articles/ai-code-codex-vs-claude-code-2026)
- **著者**: dtakamiya (miyan)
- **プラットフォーム**: Zenn
- **公開日**: 2026-05-08
- **いいね数**: 非公開
- **概要**: OpenAI Codex CLIとAnthropic Claude Codeがともに成熟期に入った今、「どちらが優れているか」議論はもう古いと指摘。シニアエンジニアが評価すべき5つの判断軸（対話力 vs 自律性、ベンチマーク、コスト構造、エコシステム統合、セキュリティ対応）を提示している。SWE-bench Verifiedはデータ汚染が確認されているため信頼性が低く、Terminal-Bench 2.0ではCodexのCLIタスク性能が際立つと分析。
- **開発者向けポイント**: ベンチマーク値を鵜呑みにせず、タスク特性ごとに使い分ける運用が現実解。両方を並走させる場合は設定資産の二重管理コストを定量的に見積もるべき。
- **実装例**: 5判断軸の評価フレームワーク、Terminal-Bench 2.0の結果引用、両ツール並走時の設定共通化テクニック。

### 4. [Claude プロンプト術 完全ガイド — 全7記事まとめ・どこから読むべきか](https://qiita.com/teppei19980914/items/462ac28dedb290eb34eb)
- **著者**: 哲平 須山 (@teppei19980914)
- **プラットフォーム**: Qiita
- **公開日**: 2026-05-13
- **いいね数**: 非公開（新規連載・トレンド上位）
- **概要**: Anthropic公式ドキュメントを基にした「42パターン+18原則」を体系化したClaudeプロンプトエンジニアリングの全8回連載をまとめたインデックス記事。概念編4本（最重要3原則、開発ワークフロー、伝わる指示、Claude Code固有機能）とパターン編3本（開発編11、思考編13、日常編18）に分かれており、ユーザー属性別の推奨読破ルートが提示されている。
- **開発者向けポイント**: 初学者は概念編→Claude Code固有機能、実務開発者は開発編11パターンを優先するのが効率的。XML構造化やChain-of-Thought、Prefill技法など基礎を抑えるとプロンプト品質が安定する。
- **実装例**: 各記事へのリンクと適用シーン早見表、開発・思考・日常という3カテゴリのパターン分類。

### 5. [【2026年5月最新】Claude Code ニュースまとめ — Opus 4.7・xhigh effort・プラグインマーケットプレイス・Agent SDK](https://qiita.com/kotaro_ai_lab/items/4ead93c23597722eef62)
- **著者**: @kotaro_ai_lab（株式会社Good Lab）
- **プラットフォーム**: Qiita
- **公開日**: 2026-05-10
- **いいね数**: 非公開
- **概要**: 2026年3月〜5月にかけてClaude Code v2.1.85→v2.1.138で追加された主要機能を網羅した実務向けまとめ記事。Opus 4.7の1Mコンテキスト標準化、新しい "xhigh effort" レベル、プラグインマーケットプレイスの拡張（URL/ZIPロード対応）、Agent SDKのアップデートなど、業務適用時に押さえるべきポイントを整理している。
- **開発者向けポイント**: Hooksに `$CLAUDE_EFFORT` 環境変数が渡るようになり、effortレベル別の条件分岐スクリプトが書ける。新トークナイザで最大35%のトークン削減、`claude project purge` でセッション履歴クリーンアップが可能。
- **実装例**: `--plugin-url` / `--plugin-dir` の使用方法、`$CLAUDE_EFFORT` を使ったHookスクリプト例、Agent SDKのhook event streaming実装。

### 6. [Cursor SDKで、AIエージェントを自作できる時代になった](https://note.com/fine_squid7715/n/n7c5ca629b99c)
- **著者**: かるく@ハーネス設計
- **プラットフォーム**: note
- **公開日**: 2026-05-08
- **いいね数**: 16
- **概要**: Cursorが提供開始したSDKを使い、TypeScriptからプログラマブルにAIエージェントを呼び出せるようになった事例を解説した記事。Cursor内部のコードインデックス、セマンティック検索、ローカル/クラウドのサンドボックス環境にアクセスできるため、「AIツールに会いに行く」開発スタイルから「開発ワークフローにエージェントを埋め込む」スタイルへの転換が可能になる。
- **開発者向けポイント**: リポジトリ要約の自動生成、変更差分のドキュメント化、テスト失敗の自動調査など反復タスクの自動化に有効。エディタ依存からの解放によりCI/CDやSlack botへの組み込みが現実的になる。
- **実装例**: Cursor SDKをTypeScriptから呼び出す基本コード、サンドボックス環境利用パターン、よくある自動化ユースケース3種。

### 7. [AI開発のコストと制限を突破する「9Router」活用ガイド](https://note.com/humble_bobcat51/n/na1a262cee0ea)
- **著者**: ゆいまる
- **プラットフォーム**: note
- **公開日**: 2026-05-08
- **いいね数**: 17
- **概要**: 40以上のプロバイダと100以上のモデルを統合インターフェースで扱えるOSSのAIルーティングシステム「9Router」の実践活用ガイド。トークン圧縮（20-40%削減）、サブスク/低コスト/無料枠の自動フォールバック、コスト追跡ダッシュボードなどでレートリミットや費用の制約を回避する手法を紹介している。
- **開発者向けポイント**: Claude → GLM → Kiro AIなど無料代替への自動切替で、開発ワークフローを止めずにコストを抑制できる。複数モデル併用時のルーティング戦略設計の参考になる。
- **実装例**: 9Routerの設定YAML、フォールバックチェーン定義、コストダッシュボードのスクリーンショット解説。

## Trending Topics

- **AIエージェント間のツール選択論**: Claude Code vs Codex vs Cursorの「どっちが上か」議論から「どう使い分けるか」へとフェーズが移行。判断軸を整理する記事が複数の媒体で同時多発的に出現。
- **PRレビュー自動化の競争激化**: `/ultrareview`、Cursor Bugbot、Cursor Security Reviewerなど自律レビュー機能が出揃い、組織パイロットによる選定手法が議論される段階に。
- **Anthropic × SpaceX提携の波及**: 5/6発表のColossus 1データセンター提携により、Claude Code利用上限2倍・API容量大幅増という外部要因が個人開発・チーム運用の前提を変化させている。
- **コスト最適化ツールの台頭**: 9Router、OpenCode Go、KingCodingなどコスト/レート制限を緩和するメタツール群が増殖。サブスク+API+無料枠のハイブリッド運用が新標準に。
- **プロンプトエンジニアリングの体系化**: Anthropic公式ドキュメントを起点に「42パターン+18原則」のような構造化された学習リソースが整備されつつある。
- **Cursor SDKによるエディタ脱却**: AIエージェントをエディタの外（CI、bot、自動化スクリプト）から呼び出すユースケースが現実化。

## Recommended Reading Order

1. **入門/概観**: [【2026年5月最新】Claude Code ニュースまとめ](https://qiita.com/kotaro_ai_lab/items/4ead93c23597722eef62) — まずは直近のClaude Codeアップデート全体像を把握
2. **判断軸の習得**: [Codex vs Claude Code 2026 ── 判断軸とやらない判断](https://zenn.dev/miyan/articles/ai-code-codex-vs-claude-code-2026) → [Cursor 3.3 vs Claude Code PRレビュー設計](https://zenn.dev/miyan/articles/ai-code-cursor-claude-pr-review-2026) — ツール選定の意思決定フレームを身につける
3. **実装/応用**: [Claude プロンプト術 完全ガイド](https://qiita.com/teppei19980914/items/462ac28dedb290eb34eb) → [Cursor SDKで、AIエージェントを自作できる時代になった](https://note.com/fine_squid7715/n/n7c5ca629b99c) — プロンプト品質向上とエージェント自作で開発ワークフローを高度化
4. **運用最適化**: [Claude Code派だった僕がCodexに移る前に知りたかったこと](https://zenn.dev/gemcook/articles/e56eabc7ba2961) → [9Router活用ガイド](https://note.com/humble_bobcat51/n/na1a262cee0ea) — ツール移行とコスト制御の両面で実運用を強化
