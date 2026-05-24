# リリース情報まとめ（2026-05-24 時点 / 直近7日間）

対象期間: 2026-05-17 〜 2026-05-24

---

## 1. google-gemini/gemini-cli — v0.43.0

- 公開日: 2026-05-22（直近7日以内）
- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリース: https://github.com/google-gemini/gemini-cli/releases/tag/v0.43.0
- 比較: https://github.com/google-gemini/gemini-cli/compare/v0.42.0...v0.43.0

### 主な変更点

**新機能**
- **外科的な編集（surgical edits）への誘導**: モデルを edit ツールの利用へ誘導するよう改善。部分的・正確なコード書き換えの精度が向上（#26480）。
- **セッションのエクスポート/インポート**: セッションをファイルに書き出し、フラグ経由で読み込めるようになった（#26514）。チーム間でのセッション共有や再現に有用。
- **サブエージェント基盤の拡充**: `AgentProtocol` の下に `LocalSubagentProtocol` / `RemoteSubagentProtocol` を追加し、進捗管理用に `SubagentState` enum を導入（#25302, #25303, #26934）。ローカル/リモート両方のサブエージェント実行の土台が整いつつある。
- **CLI インターフェースにマシンのホスト名を表示**（#25637）。リモート/コンテナ環境での実行先把握が容易に。
- **アダプティブなトークン計算機の導入**: コンテンツサイズをより正確に算出し、コンテキスト管理を改善（#26888）。

**重要な修正**
- コンテキストマネージャのチャット破損バグを修正（#26534）。
- ヘッドレス Linux 環境での OAuth 認証時のサイレントハングを防止（#26571）。
- 並列ツール呼び出しのストリーミング ID 衝突を解決（#26646）。
- `GOOGLE_CLOUD_PROJECT` に数値のみのプロジェクト ID を拒否（#26532）。
- Flash クォータ枯渇後も明示的なモデル選択を尊重するよう修正（#26872）。
- レガシーセッションの `/resume` 復元を修正（#26577）。

### 実用上のインパクト
edit ツールへの誘導強化により、エージェントが大規模な書き換えではなくピンポイントな差分編集を選びやすくなり、レビュー容易性と安全性が向上する。セッションのエクスポート/インポートは、CI やチームでの再現・引き継ぎワークフローに直接効く。

```bash
# セッションをファイルに書き出し、後で読み込む（例）
gemini --export-session session.json
gemini --import-session session.json
```

---

## 2. anthropics/claude-code — CHANGELOG（最新: v2.1.150）

- CHANGELOG 最終更新日: 2026-05-23（直近7日以内）
- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

直近7日間で v2.1.147 〜 v2.1.150 が追加された。主要なユーザー向け変更は以下。

### 主な変更点（v2.1.147 〜 v2.1.150）

**新機能・改善**
- **`/usage` のカテゴリ別内訳表示（v2.1.149）**: 利用上限の消費要因を skills / subagents / plugins / MCP サーバー別に分解して表示。どの機能がコストを押し上げているか把握しやすくなった。
- **`/simplify` を `/code-review` にリネーム（v2.1.147）**: 指定したエフォートレベルで正確性バグを報告する機能に刷新。`--comment` で GitHub PR にインラインコメントとして投稿可能。従来の「整理して修正する」挙動は廃止。
- **`/diff` 詳細ビューのキーボードスクロール対応（v2.1.149）**: 矢印 / `j`・`k` / `PgUp`・`PgDn` / `Space` / `Home`・`End` でスクロール可能に。
- **Markdown 出力で GFM タスクリストのチェックボックス描画（v2.1.149）**: `- [ ]` / `- [x]` をプレーンな箇条書きではなくチェックボックスとして表示。
- **エンタープライズ向け `allowAllClaudeAiMcps` 管理設定の追加（v2.1.149）**: `managed-mcp.json` と並行して claude.ai クラウド MCP コネクタを読み込めるように。
- **ピン留めしたバックグラウンドセッションの永続化（v2.1.147）**: `claude agents` 内で `Ctrl+T` でピン留めしたセッションがアイドル時も生存し、更新適用のためにその場で再起動、メモリ逼迫時は非ピン留めセッションの後に解放。

**セキュリティ修正（v2.1.150）**
- PowerShell の権限バイパスを修正: 組み込み `cd` 関数（`cd..`, `cd\`, `cd~`, `X:`）が作業ディレクトリを検知されずに変更し、後続コマンドがワークスペース外を読めてしまう問題を解消。
- git worktree でのサンドボックス書き込み許可リストが、共有 `.git` のみであるべきところメインリポジトリのルート全体をカバーしていた問題を修正。

**主な不具合修正**
- `find` が macOS のシステムファイル/vnode テーブルを枯渇させホストをクラッシュさせる問題を修正（v2.1.150）。
- Bash ツールが全コマンドで終了コード 127 を返す回帰を修正（v2.1.148）。
- skill / agent フロントマターの `effort:` が反映されずベースラインの `/effort` を表示していた問題を修正（v2.1.150）。

### 実用上のインパクト
`/code-review` は CI/PR ワークフローへ組み込みやすく、`--comment` でレビューを自動投稿できる。`/usage` のカテゴリ別内訳は、サブエージェントや MCP のコスト最適化に直結する。

```bash
# 高エフォートでレビューし、PR にインラインコメントを投稿
/code-review high --comment

# 利用上限の消費内訳を確認
/usage
```

---

## 3. cursor — 3.5

- 公開日: 2026-05-20（直近7日以内）
- サイト: https://cursor.com
- チェンジログ: https://cursor.com/changelog

### 主な変更点（Cursor Automations 強化）

- **Agents Window 内での Automations**: cursor.com/automations に加え、Agents Window 内からも Automation を作成・管理可能に。エージェントと同じワークスペースで自動化を扱える。
- **マルチリポジトリ対応**: 1つの Automation に複数リポジトリを紐づけ、エージェントが必要なコンテキスト全体を横断して推論・実行・検証できる。
- **No-repo Automations**: コードベースに依存しない自動化を導入。ツールを監視し、重要なシグナルに応じて動作。Slack ダイジェスト、プロダクト分析、カスタマーヘルス監視など5種のマーケットプレイステンプレートを追加。
- **プロモーション**: リリースから7日間、新規作成の Automation エージェント実行が50%オフ。

### 実用上のインパクト
マルチリポジトリ対応と No-repo Automations により、横断的なタスクや監視系のワークフロー（通知集約、メトリクス監視）をエージェントへ委譲しやすくなった。

---

## 4. microsoft/vscode — 1.121.0（AI / GitHub Copilot 関連のみ）

- 公開日: 2026-05-20（直近7日以内）
- リポジトリ: https://github.com/microsoft/vscode
- リリース: https://github.com/microsoft/vscode/releases/tag/1.121.0
- リリースノート詳細: https://code.visualstudio.com/updates/v1_121

※ 本リポジトリのルールに従い、AI 機能 / GitHub Copilot 連携のみを抜粋。

### AI 関連の主な変更点

- **Agents Window（プレビュー）**: タイトルバーから「Open in Agents」でエージェント主導の companion ウィンドウを起動。エージェントファーストな開発ワークフローを強化。
- **Remote Agents（プレビュー）**: 自分が所有し SSH / dev tunnel で接続できるリモートマシン上でエージェントセッションを実行可能に。新しいオープンな **Agent Host Protocol (AHP)** を採用し、複数クライアントの同時連携に対応。
- **Claude Agent の Auto 権限モード（プレビュー）**: 権限プロンプトなしでアクションを実行しつつ、実行前に分類器が安全性をレビュー。
- **OpenTelemetry & Grafana モニタリング**: Azure Managed Grafana のダッシュボードでエージェント操作、トークン使用量、チャットセッション、ツール呼び出し、モデル別レイテンシを可視化。
- **言語モデルの設定性向上**: コミットメッセージやタイトル生成などを担う Utility Models を選択可能に。Chat Completions / Responses / Messages 互換エンドポイントに対応する新 BYOK カスタムエンドポイントプロバイダーを追加。
- **ターミナルツールの最適化**: `VSCODE_AGENT` 環境変数によるエージェント認識コマンド、バックグラウンドターミナルのインジケータと自動クリーンアップ、テストランナー/ビルド/パッケージマネージャ向けの出力圧縮、機密情報を含むプロンプトの傍受によるクレデンシャル漏洩防止。
- **Quick Suggestions のデフォルト変更**: Copilot などのインライン補完プロバイダーが利用可能な場合、入力時に suggest コントロールを自動表示しなくなり、補完ノイズを軽減。

### 実用上のインパクト
Remote Agents と AHP により、ローカルマシンの負荷をかけずにエージェント開発を行える。OpenTelemetry/Grafana 連携でエージェントのトークン消費やレイテンシを定量的に監視でき、コスト管理に役立つ。

---

## 5. cline/cline — CLI v3.0.13

- 公開日: 2026-05-23（直近7日以内）
- リポジトリ: https://github.com/cline/cline
- リリース: https://github.com/cline/cline/releases/tag/cli-v3.0.13
- 比較: https://github.com/cline/cline/compare/cli-v3.0.12...cli-v3.0.13

### 主な変更点

- **履歴からのセッション再開時にローディングダイアログを表示**: 読み込み中に TUI がフリーズして見える問題を解消。
- **`/clear` コマンドの高速化**: 新規セッションの生成を次のプロンプト送信時まで遅延させることで、`/clear` が空セッションの起動を待たずに即座に完了するように。

### 実用上のインパクト
いずれも UX/応答性の改善。セッション切り替えや履歴復元時の体感速度が向上する小規模アップデート。

---

## 6. kiro — CLI 2.4.0

- 公開日: 2026-05-20（直近7日以内）
- サイト: https://kiro.dev
- チェンジログ: https://kiro.dev/changelog/

### 主な変更点

- **会話のリワインド（`/rewind`）**: 会話内の任意の過去プロンプトに巻き戻し、その地点から新しいセッションとして続行可能。元のスレッドを失わずに別ルートを試せる。
- **モデルの推論エフォート（`/effort`）**: low / medium / high / xhigh / max の5段階で計算強度を制御。単純なタスクは高速・低コスト、複雑な問題には推論の余地を与える。
- **統合設定メニュー（`/settings`）**: テーマ、キーボードショートカット、ターミナル設定を1か所に集約し、散在していた設定コマンドを置き換え。
- ワークスペース初期化速度を88%改善。

### 実用上のインパクト
`/rewind` は試行錯誤的なプロンプティングを安全に行える。`/effort` はタスク難易度に応じてコストとレスポンス速度を調整でき、運用コスト最適化に有効。

```text
/rewind          # 過去プロンプトに巻き戻して新セッションで続行
/effort high     # 複雑なタスク向けに推論エフォートを引き上げ
/settings        # 統合設定メニューを開く
```

---

## 7. openai/codex — 0.134.0-alpha.3（プレリリース）

- 公開日: 2026-05-23（直近7日以内）
- リポジトリ: https://github.com/openai/codex
- リリース: https://github.com/openai/codex/releases/tag/rust-v0.134.0-alpha.3

### 主な変更点

- アルファ版（プレリリース）として `0.134.0-alpha.3` を公開。リリースノート本文は「Release 0.134.0-alpha.3」のみで、詳細な変更点の記載はなし。
- 各プラットフォーム向けバイナリ（macOS / Linux / Windows、各 arch）、npm パッケージ、`codex-app-server`、`codex-responses-api-proxy`、SDK パッケージ、Windows サンドボックスセットアップ等の成果物を同梱。

### 実用上のインパクト
0.134.0 系の安定版に向けた検証用プレリリース。app-server / responses-api-proxy などの周辺コンポーネントが継続的にビルド・配布されており、最新の検証を行いたい場合のみ利用を推奨。

---

## 8. github/copilot-cli — v1.0.53-2（プレリリース）

- 公開日: 2026-05-24（直近7日以内）
- リポジトリ: https://github.com/github/copilot-cli
- リリース: https://github.com/github/copilot-cli/releases/tag/v1.0.53-2

### 主な変更点

- 「Fixes and changes」とのみ記載されたプレリリース。詳細な変更点の明記はなし。
- 各 OS / arch 向けバイナリ（macOS / Linux / Linux musl / Windows）、MSI インストーラ、npm パッケージ（tgz）を配布。

### 実用上のインパクト
不具合修正中心のメンテナンスリリース（プレリリース）。安定運用を重視する場合は安定版の確認を推奨。

---
