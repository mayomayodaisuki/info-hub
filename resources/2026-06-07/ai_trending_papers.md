## 今週のAI論文トレンド

1. **タイトル:** On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters
   **著者:** Mind Lab, Vin Bo, Song Cao, Andrew Chen, Kaijie Chen ほか多数
   **概要:** 本研究は、パラメータ効率的ファインチューニング（PEFT）を単なるフルファインチューニングの低コストな代替手段としてではなく、強力な共有基盤モデルの上に載せる「永続的なローカル状態」として捉え直す。基盤モデルが共通の能力を提供し、小さな学習可能アダプタが嗜好・スキル・ツールの使い方・記憶的更新といったインスタンス固有の挙動を担うという枠組みを提示する。問題を3つのスケーリング軸（共有事前知識を強化するScale Up、アダプタをどこまで小さくできるかを探るScale Down、多数の永続アダプタを共存させるScale Out）で整理した。さらにアダプタの同一性・改訂・来歴・評価・配信常駐を管理するインフラ例としてMinTを示す。結果として、PEFTがフルファインチューニングの予算節約手段にとどまらず、多数の永続的な個人モデルを支えるコンパクトな基盤となり得ることを示唆している。
   **arXiv:** https://arxiv.org/abs/2606.02437

2. **タイトル:** Crafter: A Multi-Agent Harness for Editable Scientific Figure Generation from Diverse Inputs
   **著者:** Haozhe Zhao, Shuzheng Si, Zhenhailong Wang, Zheng Wang, Liang Chen, Xiaotong Li, Zhixiang Liang, Maosong Sun, Minjia Zhang
   **概要:** 科学的な図表は複雑な研究内容を伝える最も効果的な手段の一つだが、出版品質の図の作成は論文準備の中でも特に手間のかかる作業である。既存の自動生成システムは単一の図種・テキスト入力のみを対象とし、研究者が実際に使う図種や条件の多様性に対応できず、ラスター出力のため局所的な修正もできない。著者らは、科学的図表が離散的な意味要素から構成される構造化された合成物であり、生成器が起こす局所的な誤りには強力なバックボーンではなく「ハーネス（足場）」が必要だと主張する。これを2つのシステムとして実装した。アーキテクチャを変更せず多様な図種・入力条件に汎化するマルチエージェント生成ハーネスCrafterと、同じ枠組みでラスター出力を編集可能なSVGに変換するCraftEditorである。さらに3図種・4入力条件にわたり人手品質注釈を付したベンチマークCraftBenchを提案。実験ではCrafterがPaperBanana-BenchとCraftBenchで単独生成器やエージェント型ベースラインを大きく上回り、CraftEditorも編集可能なSVGへの変換で全ベースラインを凌駕した。
   **arXiv:** https://arxiv.org/abs/2605.30611

3. **タイトル:** Domino: Decoupling Causal Modeling from Autoregressive Drafting in Speculative Decoding
   **著者:** Jianuo Huang, Yaojie Zhang, Qituan Zhang, Hao Lin, Hanlin Xu, Linfeng Zhang
   **概要:** 投機的デコーディングは複数トークンを下書き（ドラフト）し、ターゲットモデルで並列検証することでLLM推論を高速化するが、実際の高速化はドラフト品質とドラフトコストのトレードオフに制約される。自己回帰型ドラフタはトークン間の因果依存をモデル化できるが逐次処理のオーバーヘッドを伴い、並列型ドラフタはコストを下げる一方でブロック内依存のモデル化が弱まる。本論文は、因果依存モデリングを高コストな自己回帰実行から切り離すフレームワークDominoを提案する。まず並列ドラフトバックボーンでブロック全体の暫定分布を生成し、続いて軽量なDominoヘッドが接頭辞依存の因果情報でそれを補正する。教師強制による因果符号化を安定化させるため、並列バックボーンを先に強化してから因果補正済みの最終分布へ最適化を移すbase-anchored訓練カリキュラムも導入した。Qwen3モデルでの実験では、Transformersバックエンドで最大5.49倍のエンドツーエンド高速化、SGLangサービングで最大5.8倍のスループット向上を達成した。
   **arXiv:** https://arxiv.org/abs/2605.29707
