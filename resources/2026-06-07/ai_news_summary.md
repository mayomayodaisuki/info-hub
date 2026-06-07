# AI News Summary - 2026-06-07

## Major Announcements

### OpenAI
- **Title**: Codex for every role, tool, and workflow（ロール特化プラグイン / Codex Sites / Annotations 拡張）
- **Date**: 2026-06-02
- **Source**: https://openai.com/index/codex-for-every-role-tool-workflow/
- **Summary**: Codex を従来のコーディング用途から拡張し、6 つのロール特化プラグイン（Data Analytics、Creative Production、Sales、Product Design など、62 アプリ・110 自動スキルをバンドル）、プロンプトから内部アプリを生成・デプロイする「Codex Sites」（プレビュー）、ドキュメント・スプレッドシート・スライドにも対応する Annotations 機能を同時発表。Codex の週次利用者は 500 万人を超えたとされる。
- **開発者への影響**: Codex がコード生成だけでなく社内ツール構築や業務ワークフロー自動化のプラットフォームへ拡張された。プロンプトからホスト型アプリを生成できる Codex Sites は、社内ツールのプロトタイピングや配布を AI 駆動で高速化する。

### OpenAI
- **Title**: Container セッション課金の従量化、モデレーション統合、各種機能の非推奨化（API Changelog）
- **Date**: 2026-06-02 〜 2026-06-04
- **Source**: https://developers.openai.com/api/docs/changelog
- **Summary**: 6/2 にコンテナセッション課金が従来の一律 20 分単位から「5 分最低の分単位課金」へ変更（単価は据え置きでより細かい粒度に）。6/3 に reusable prompt objects、Evals プラットフォーム、Agent Builder の非推奨化を告知（シャットダウン時期も公開）。6/4 に Responses / Chat Completions API へ `moderation` オブジェクトによるモデレーションスコアリングを統合。
- **開発者への影響**: 短時間のコンテナ実行コストが下がり、エージェント系ワークロードの費用最適化に寄与。一方で reusable prompts や Evals、Agent Builder の非推奨化により、該当機能を利用中の開発者はアプリケーションコードへの移行が必要。モデレーション統合は安全性チェックを別呼び出しなしで組み込める。

### Anthropic
- **Title**: Claude Partner Network の拡張（Services Track と Partner Hub のローンチ）
- **Date**: 2026-06-03
- **Source**: https://www.anthropic.com/news
- **Summary**: Claude のパートナーエコシステムを拡大する新コンポーネントとして Services Track と Partner Hub を公開。開発者・実装パートナー向けの支援体制を強化する内容。
- **開発者への影響**: Claude を活用した受託開発・導入支援に取り組むパートナーやエンジニア向けのリソースが整備され、Claude ベースのソリューション構築の支援が得やすくなる。

### NVIDIA / Hugging Face
- **Title**: NVIDIA Cosmos 3: The First Open Omni-model for Physical AI（Hugging Face 公開）
- **Date**: 2026-06-01
- **Source**: https://huggingface.co/blog/nvidia/cosmos-3-for-physical-ai
- **Summary**: world generation・physical reasoning・action generation を 1 つに統合した初のオープンな omni-model「Cosmos 3」を Hugging Face で公開。Mixture-of-Transformers アーキテクチャを採用し、16B の Cosmos 3 Nano（RTX PRO 6000 クラスで動作）と 64B の Cosmos 3 Super を提供。Diffusers との統合も用意。
- **開発者への影響**: モデルカードとライセンス付きで Hugging Face から直接利用でき、Diffusers パイプラインに組み込める。フィジカル AI / シミュレーション向けだが、オープンウェイトかつ Diffusers 統合により開発者がローカルで試行・ファインチューニングしやすい。

## Other Notable Updates

### Hugging Face コミュニティ（チュートリアル）
- **How to Fine-Tune Nemotron 3.5 ASR for Your Language, Domain, or Accent**（~2026-06-04, NVIDIA）: https://huggingface.co/blog
- **Fine-tune FLUX.2 [klein] with a LoRA under 60 minutes**（~2026-06-04, Black Forest Labs）: https://huggingface.co/blog
- いずれもオープンモデルのファインチューニング手順を解説したガイドで、独自データへのモデル適応を検討する開発者向けの実用的な情報。

## Source References
- OpenAI Blog: https://openai.com/blog
- Google AI Blog: https://ai.googleblog.com/
- Anthropic News: https://www.anthropic.com/news
- Meta AI Blog: https://ai.meta.com/blog/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- DeepMind Blog: https://deepmind.google/discover/blog/
- Hugging Face Blog: https://huggingface.co/blog
