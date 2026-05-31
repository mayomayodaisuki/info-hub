# リリース情報ダイジェスト（2026-05-31）

対象期間: 2026-05-24 〜 2026-05-31（直近7日間）

直近7日以内に更新があったリポジトリのみを掲載しています。

---

## 1. google-gemini/gemini-cli — v0.44.1 / v0.44.0

- 最新安定版: `v0.44.1`（2026-05-28 公開）
- 実質的な機能変更は `v0.44.0`（2026-05-27 公開）に含まれます。`v0.44.1` は cherry-pick によるパッチリリースです。

### 主な変更点（v0.44.0）

機能追加・改善:
- Auto モードを単一の「Auto mode」に統合（従来の複数 Auto モードを廃止）。動作モードの選択がシンプルに。
- エージェント登録を first-wins 方式に変更し、プロジェクト設定を優先（`feat(core): change agent registration to first-wins and prioritize project`）。
- サブエージェントのスレッドコンテキストを分離（`fix(core): isolate subagent thread context`）。サブエージェント間の文脈混入を防止。
- `AgentSession` / `LocalSessionInvocation` / `RemoteSessionInvocation` を追加し、agent-tool に統合。ローカル/リモートのセッション実行を抽象化。
- `adk.agentSessionSubagentEnabled` フラグを追加。
- エディタ連携に Sublime Text / Emacs Client を追加し、エラーメッセージとドキュメントを改善。
- スキル機能に `agent-tui` / `tui-tester` を追加。
- gemini-3.1 モデル向けのエイリアスと thinking 設定を追加。

安定性・セキュリティ修正:
- OAuth リフレッシュトークンのローテーション/取得時の保持を改善。MCP OAuth トークン再認証後の利用も修正。
- `NO_PROXY` をネットワーク系 MCP サーバーおよびグローバル fetch dispatcher で尊重するよう修正。
- カスタムコマンドのファイルインジェクションにおけるパストラバーサルを防止（セキュリティ修正）。
- 依存パッケージの critical / high 脆弱性を修正。
- Windows / WSL2 / NixOS / Alpine など各種環境での互換性・PTY 周りの修正多数（SIGHUP kill 防止、矢印キー操作、pwsh 優先など）。

### 開発者への実務的インパクト

- 複数あった Auto モードが 1 つに統合されたため、自動承認の挙動を再確認する必要があります。`AUTO_EDIT` モードではシェルリダイレクトが自動承認されるようになりました。
- サブエージェントのコンテキスト分離により、複数エージェントを使うワークフローでの文脈汚染が減り、信頼性が向上します。
- 企業ゲートウェイ/プロキシ環境での認証・通信の安定性が改善しており、`NO_PROXY` を正しく解釈するようになった点はプロキシ配下の開発者にとって重要です。

### リンク

- リポジトリ: https://github.com/google-gemini/gemini-cli
- リリース（v0.44.1）: https://github.com/google-gemini/gemini-cli/releases/tag/v0.44.1
- リリース（v0.44.0）: https://github.com/google-gemini/gemini-cli/releases/tag/v0.44.0

---

## 2. anthropics/claude-code — CHANGELOG（最新 v2.1.158）

- CHANGELOG.md 最終更新: 2026-05-30
- 直近7日間に複数バージョン（v2.1.154 〜 v2.1.158）が追加されています。

### 主な変更点

v2.1.158:
- Auto mode が Bedrock / Vertex / Foundry 上の Opus 4.7・Opus 4.8 で利用可能に。`CLAUDE_CODE_ENABLE_AUTO_MODE=1` でオプトイン。

v2.1.157:
- `.claude/skills` ディレクトリ内のプラグインが marketplace 不要で自動ロードされるように。
- `claude plugin init <name>` を追加し、`.claude/skills` に新規プラグインの雛形を生成。
- `/plugin` 引数（サブコマンド、インストール済みプラグイン名、既知 marketplace のプラグイン）のオートコンプリートを追加。
- `claude agents`: `settings.json` の `agent` フィールドがディスパッチセッションで尊重され、`--agent <name>` で上書き可能。
- `EnterWorktree` がセッション中に Claude 管理 worktree 間を切り替え可能に。
- `tool_decision` テレメトリに `tool_parameters`（bash コマンド、MCP/スキル名）を追加（`OTEL_LOG_TOOL_DETAILS=1` 時）。

v2.1.154（大型リリース）:
- Opus 4.8 に対応。デフォルトで high effort、最難タスク向けに `/effort xhigh`。
- 動的ワークフロー（dynamic workflows）を導入。Claude に workflow 作成を依頼すると、バックグラウンドで数十〜数百のエージェントにまたがる作業をオーケストレーション。`/workflows` で実行状況を確認。
- Opus 4.8 の Fast mode が大幅に低コスト化（標準の 2 倍料金で 2.5 倍の速度）。
- Haiku / Sonnet / Opus 4.7 以前を除く全モデルで lean system prompt がデフォルトに。
- `/simplify` がクリーンアップ専用レビュー（reuse / simplification / efficiency / altitude）として再定義され、バグ探索を伴う `/code-review --fix` とは分離。
- `claude agents`: `! <command>` でシェルコマンドをバックグラウンドセッションとして実行・アタッチ/デタッチ可能（`claude --bg --exec '<command>'` でも利用可）。
- プラグインが `plugin.json` / marketplace エントリで `defaultEnabled: false` を宣言可能に。

### 重要機能の使い方とインパクト

Auto mode（v2.1.158）:
```bash
# Bedrock/Vertex/Foundry 環境で Auto mode を有効化
export CLAUDE_CODE_ENABLE_AUTO_MODE=1
```
- セルフホスト/クラウドプロバイダ経由で Claude Code を使うチームでも Auto mode が使えるようになり、エンタープライズ環境での自動化の幅が広がります。

プラグインのローカル自動ロード（v2.1.157）:
```bash
# 新規プラグインの雛形を .claude/skills 配下に生成
claude plugin init my-plugin
```
- `.claude/skills` に置いたプラグインが marketplace 登録なしで自動的に読み込まれるため、プロジェクト固有のスキル/プラグインをリポジトリに同梱して共有するワークフローが容易になります。

動的ワークフロー（v2.1.154）:
- 大規模・複雑なタスクを多数のエージェントへ自動分散できるため、リファクタリングや大規模調査など「人間が分割すると手間がかかる」作業の自動化に有効です。`/workflows` で進捗を一元管理できます。

### リンク

- リポジトリ: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- 公式ドキュメント: https://docs.anthropic.com/en/docs/claude-code/overview

---

## 3. cursor/cursor — Cursor 3.6

- 最新リリース: `3.6`（2026-05-29）

### 主な変更点

- Auto-review Run Mode（自動レビュー実行モード）を追加。安全性を保ちつつ承認プロンプトを削減する新しい実行モード。
  - 対象: Shell / MCP / Fetch ツール呼び出し。
  - 動作: 許可リスト（allowlist）に登録済みの呼び出しは即時実行、サンドボックス化可能なものはサンドボックスで実行。それ以外は分類器（classifier）サブエージェントが評価し、許可・リダイレクト・ユーザー承認要求のいずれかにルーティング。
  - 設定: Settings > Cursor Settings > Agents > Run Mode から設定可能。
  - カスタマイズ: 分類器サブエージェントの判断を導くカスタム指示（custom instructions）を指定可能。

### 開発者への実務的インパクト

- エージェントの自律性を高めつつ、危険な操作のみを人間の承認に回すバランスを取れます。許可リストと分類器を組み合わせることで、繰り返し発生する承認プロンプトを減らしながら安全性を維持できます。

### リンク

- 公式サイト: https://cursor.sh
- 変更履歴: https://cursor.sh/changelog （現在は https://cursor.com/changelog にリダイレクト）

---

## 4. microsoft/vscode — 1.122.1 / 1.122.0（AI・GitHub Copilot 関連のみ）

- 最新版: `1.122.1`（2026-05-29 公開、パッチ）。実質的な機能は `1.122.0`（2026-05-28 公開）。

### AI / GitHub Copilot 関連の変更点

Agents Window（プレビュー）:
- セッションにホバーするとハーネス種別、プロジェクト、worktree、変更ファイルなどのセッション情報を表示。
- ローカル VS Code ハーネス（Insiders 限定）の早期実験機能。カスタムエージェント選択の改善を含む。
- Agents Window から「Chat: Manage Language Models」を直接実行してモデルを構成可能（エディタと Agents Window 間で同期）。

OpenTelemetry モニタリング:
- ローカルエージェントセッションが GitHub Copilot CLI の規約に揃った標準的な `github.copilot.*` 属性を発行。リポジトリコンテキスト、エージェント分類、構造化ツールパラメータ、結果トラッキングを追加。

サンドボックス:
- ターミナルのサンドボックスは Default Approvals 時のみ適用。「Bypass Approvals」/「Autopilot」モード時は自動フォールバックリトライを廃止。

BYOK（Bring Your Own Key）強化:
- サインインなしで BYOK が機能。エアギャップ/制限環境でもチャット・ツール・MCP サーバーを利用可能。
- 対応プロバイダ: Anthropic / Azure / Gemini / OpenAI / Ollama / OpenRouter / カスタムエンドポイント。
- ユーティリティモデル（チャットタイトル/コミットメッセージ生成用）の構成を促す通知を追加。

Custom Endpoint Provider:
- Stable 版で利用可能に。Chat Completions / Responses / Messages API を使って自己ホスト・エンタープライズ・互換 AI エンドポイントへ接続可能。

### リンク

- リポジトリ: https://github.com/microsoft/vscode
- リリース（1.122.1）: https://github.com/microsoft/vscode/releases/tag/1.122.1
- リリースノート: https://code.visualstudio.com/updates/v1_122

---

## 5. cline/cline — v3.86.0（VS Code 拡張）/ CLI v3.0.15

- VS Code 拡張 最新版: `v3.86.0`（2026-05-28 公開）
- CLI 最新版: `cli-v3.0.15`（2026-05-29 公開）

### 主な変更点（VS Code 拡張 v3.86.0）

追加:
- Claude Opus 4.8 プロバイダ対応（利用可能な場合は 1M コンテキスト版も）。
- Moonshot Kimi K2.6 モデル対応。

修正:
- Cline プロバイダの Qwen 3.7 Max で prompt-cache サポートを表示。
- VS Code nightly publish ワークフローの起動権限を修正。

変更:
- VS Code 拡張プロジェクトを `apps/vscode` 配下へ移動。

### 主な変更点（CLI v3.0.15）

新機能・改善:
- Cline Hub を追加。接続クライアントの監視、セッションの閲覧・操作、アシスタント出力のストリーミング、ローカルハブの再起動を行う Web アプリ。ローカル/LAN/トンネル利用は room secret でゲート。
- グローバル AGENTS ルールに対応。エージェントルールをプロジェクト単位だけでなく全セッションへ適用可能に。
- サンドボックスにインストールされたプラグインが静的/動的なルールコンテンツを提供可能に。
- Discord セッションをメッセージ作成者ごとにバインド（スレッド内で別ユーザーがチャット状態を共有しなくなる）。`/mute` `/unmute` で特定参加者をミュート可能。
- TUI 内の OAuth URL をクリック可能に。
- 同梱モデルカタログを更新（Claude Opus 4.8、Moonshot Kimi K2.6、Qwen3.7 Max（キャッシュ対応）を追加）。
- シンボリックリンクされた SDK スキルディレクトリ（循環シンボリックリンク含む）を検出。

### DX への実務的インパクト

- Cline Hub により複数クライアント/セッションを Web から一元監視・操作できるようになり、長時間稼働のエージェント運用やリモート確認がしやすくなります。
- グローバル AGENTS ルールにより、組織やユーザー単位の共通エージェント方針を全プロジェクトに横断適用でき、設定の重複を削減できます。
- 最新モデル（Opus 4.8 / Kimi K2.6 / Qwen3.7 Max）への即時対応で、コスト/性能のモデル選択肢が広がります。

### リンク

- リポジトリ: https://github.com/cline/cline
- リリース（v3.86.0）: https://github.com/cline/cline/releases/tag/v3.86.0
- リリース（CLI v3.0.15）: https://github.com/cline/cline/releases/tag/cli-v3.0.15

---

## 6. kiro — Claude Opus 4.8 Now Available

- 最新エントリ: 2026-05-29（Models）

### 主な変更点

- Claude Opus 4.8 が Kiro IDE / CLI / Web で利用可能に。Opus 4.7 からの直接アップグレード。
- 改善点: より強力なセルフベリフィケーション、効率的なツール呼び出し、長期プロジェクトでのフォロースルー向上。
- 対象: Pro / Pro+ / Power 顧客。
- スペック: 1M コンテキストウィンドウ、最大 128K 出力、クレジット倍率 2.2x。
- インフラ: us-east-1（北バージニア）および eu-central-1（フランクフルト）で推論。
- アクセス: CLI ユーザーは最適動作のため v2.5.0 以上が必要。IDE/CLI ユーザーは再起動でモデルセレクタから選択可能。

### 開発者への実務的インパクト

- 長期・大規模なタスクでの自己検証とツール呼び出し効率が向上しており、複雑な実装やリファクタリングでの信頼性が高まります。CLI を使う場合は v2.5.0 以上へのアップデートが前提です。

### リンク

- 公式サイト: https://kiro.dev
- 変更履歴: https://kiro.dev/changelog/

---

## 7. openai/codex — 0.135.0 / 0.134.0

- 最新安定版: `rust-v0.135.0`（2026-05-28 公開）
- 期間内に `rust-v0.134.0`（2026-05-26 公開）も含まれます。

### 主な変更点（0.135.0）

新機能:
- `codex doctor` が環境・Git・ターミナル・app-server・スレッドインベントリのより詳細な診断をサポート（サポートケース向け）。
- リモートトランスポート接続時に `/status` がリモート接続詳細とサーバーバージョンを表示。
- Vim モードにテキストオブジェクト編集、word/line-end 挙動の改善、割り込みターンのキーバインド設定を追加。
- `/permissions` が名前付きパーミッションプロファイルを理解し、カスタムプロファイルを表示。
- パッケージ版 Codex が同梱のパッチ済み zsh ヘルパーを macOS/Linux で利用可能に。
- Python SDK が thread/turn API 向けに使いやすい `Sandbox` プリセットを公開。
- `install.sh` / `install.ps1` が `CODEX_NON_INTERACTIVE=1` で非対話インストールをサポート。

バグ修正:
- TUI のマークダウンテーブル/複数行リストの描画改善。
- macOS / Zellij での TUI 出力の安定化。
- 古い tmux/iTerm の control-mode セッションでの `Ctrl-C` 挙動を修正。

### 主な変更点（0.134.0）

- ローカル会話履歴の検索（大文字小文字を区別しない内容一致＋結果プレビュー）を追加。
- `--profile` を CLI / TUI permissions / sandbox 全体の主要プロファイルセレクタに。レガシープロファイル設定はマイグレーション案内付きで拒否。
- MCP セットアップ改善（サーバーごとの環境ターゲティング、streamable HTTP サーバー向け OAuth オプション）。
- `readOnlyHint` を持つ読み取り専用 MCP ツールの並列実行を許可。
- 拡張ツールへの会話履歴公開、フック入力へのサブエージェント識別子追加など、拡張/フックのコンテキストを充実。

### 開発者への実務的インパクト

- 非対話インストール（`CODEX_NON_INTERACTIVE=1`）と `codex doctor` の診断強化により、CI/CD や自動プロビジョニング、サポート時の問題切り分けが容易になります。
- 名前付きパーミッションプロファイル（`--profile` / `/permissions`）により、用途ごとに権限セットを切り替える運用が標準化されます。
- 読み取り専用 MCP ツールの並列実行で、情報収集系のツール呼び出しが高速化します。

### リンク

- リポジトリ: https://github.com/openai/codex
- リリース（0.135.0）: https://github.com/openai/codex/releases/tag/rust-v0.135.0
- リリース（0.134.0）: https://github.com/openai/codex/releases/tag/rust-v0.134.0

---

## 8. github/copilot-cli — 1.0.56

- 最新安定版: `1.0.56`（2026-05-29 公開）

### 主な変更点

- Free / Student ユーザーがモデルピッカーで Auto 以外のモデルを選択可能に。
- `builtInAgents.rubberDuck` 設定を追加し、`copilot config` から rubber duck エージェントの有効/無効を切り替え可能。
- モデルピッカーが料金ティアごとの正確な合計コンテキストウィンドウサイズを表示。
- 設定・設定ファイルをアトミックに書き込み、複数 CLI プロセス同時実行時のデータ損失を防止。
- BYOK プロバイダ設定が ACP セッションへ正しく適用されるように修正。
- MCP ツールが `content`（人間可読テキスト）と `structuredContent` の両方を返す場合、どちらも欠落させずエージェントに提示（MCP 仕様 §5.2.6 のとおりテキストが JSON シリアライズそのものなら重複排除、そうでなければ連結）。
- gh CLI が PATH 上にある場合、GitHub MCP サーバーが gh で代替可能な冗長ツールをデフォルトで省略し、トークン使用量を削減。
- Code review エージェントが固定デフォルトではなく現在のセッションと同じモデルを使用。
- reasoning effort ピッカーがモデルの対応能力を尊重（非対応オプションは非表示）。
- diff 表示が連続スクロール＋スティッキーなファイル/ハンクヘッダー、全幅、テーマ対応カラーに。
- web_fetch ツールが HTTP コンテンツネゴシエーションで markdown を優先（ドキュメントサイトでよりクリーンな結果）。

### 開発者への実務的インパクト

- 設定ファイルのアトミック書き込みにより、複数ターミナルで copilot を同時に使う際の設定破損リスクが下がります。
- gh CLI 検出時の MCP ツール省略はトークン消費削減に直結し、コンテキスト効率が向上します。
- Code review エージェントがセッションのモデルに追従するため、高性能モデル利用時のレビュー品質が一貫します。

### リンク

- リポジトリ: https://github.com/github/copilot-cli
- リリース（1.0.56）: https://github.com/github/copilot-cli/releases/tag/v1.0.56
