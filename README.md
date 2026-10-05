# Weekly & Daily AI Development Digest

AI駆動開発投稿用プロジェクトです。週刊（Weekly）および日刊（Daily）のレポート生成に対応しています。

## 概要

このプロジェクトは以下のソースから情報を自動収集し、日刊・週刊レポートを生成します。

- GitHub リリース・チェンジログ
- AI関連ニュース
- AI関連のトレンドリポジトリ
- AI論文トレンド（Hugging Faceトレンド）
- AI開発イベント（Connpass）
- Hacker News & Reddit のディスカッション
- 日本のテックブログ（Zenn、Qiita、note）

## 特徴

- **自動情報収集**: 複数のソースから最新のAI開発情報を自動収集
- **日刊 / 週刊レポート選択**: `config.json` 設定ファイルで日刊・週刊モードを切り替え可能
- **高品質な記事生成**: textlintを使用した日本語AI文章の品質チェック
- **包括的なテスト**: Promptfoo（Gemini Flashプロバイダー）による品質・安全性テスト
- **柔軟な実行方式**: 対話モード・非対話モードでの実行が可能

## 設定（config.json）

ルートディレクトリの `config.json` にてレポート種別（日刊/週刊）を設定できます。

```json
{
  "mode": "daily",
  "daily": {
    "titlePrefix": "日刊AI駆動開発ダイジェスト",
    "daysToCollect": 1
  },
  "weekly": {
    "titlePrefix": "週刊AI駆動開発ダイジェスト",
    "daysToCollect": 7
  }
}
```

* `mode`: `"daily"` または `"weekly"` を指定します。

## セットアップ

### 必要な依存関係のインストール

```bash
# npm依存関係をインストール
npm install

# textlintの設定確認
npx textlint --version
```

### textlintの使用方法

記事の品質チェックを手動で実行する場合：

```bash
# npmスクリプトを使用した方法（推奨）
npm run lint          # 記事をチェック
npm run lint:fix      # 自動修正可能な問題を修正
npm run lint:check    # textlint設定を確認

# 直接textlintを使用する方法
npx textlint articles/*.md                    # 記事をチェック
npx textlint --fix articles/*.md              # 自動修正
npx textlint articles/weekly_ai_YYYYMMDD.md  # 特定ファイル
```

## 利用方法

### データ収集の実行

```bash
npm run collect:all
```

`config.json` で設定されたモード（daily / weekly）に基づいてデータ収集スクリプトが並列実行され、`resources/YYYY-MM-DD/` に情報が保存されます。

### 利用可能なコマンド一覧
- `/weekly_digest_pipeline` 情報の取得、記事の生成、コミットまでの一連の作業を行うパイプライン
- `/generate_weekly_article` 既存データから最終記事を生成（`resources/YYYY-MM-DD/`から）
- `/vibecoding_release_digest` GitHubリリースとチェンジログの更新をチェック
- `/ai_news_digest` 最新のAI関連ニュースと発表を収集
- `/ai_trending_repositories_digest` GitHubのトレンドAI関連リポジトリを分析
- `/ai_trending_papers_digest` Hugging FaceからトレンドAI論文を取得し要約を生成
- `/ai_events_digest` Connpassで今後のAI開発イベントを検索
- `/hacker_news_reddit_digest` HNとRedditのトレンドAI開発ディスカッションを収集
- `/ai_tec_blog_digest` Zenn、Qiita、noteでAI開発記事を検索

## テスト

このプロジェクトでは、複数のテスト手法を使用して品質と安全性を確保しています。

- **Promptfoo**: Gemini Flash（`gemini-1.5-flash`）プロバイダーを使用してAIガードレールと出力をテスト
- **textlint**: 生成される記事の文章品質をチェック

### Promptfooテストのセットアップと実行

```bash
# Promptfooテストの実行（ルートより）
npm run test:prompt

# または Promptfoo ディレクトリ内にて
cd tests/promptfoo
npm test
```

### textlintテスト

```bash
# 記事の品質チェック
npm run lint

# 自動修正とチェック
npm run lint:fix

# textlint設定の確認
npm run lint:check
```
