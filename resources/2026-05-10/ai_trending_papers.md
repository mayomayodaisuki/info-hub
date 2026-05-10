## 今週のAI論文トレンド

1. **タイトル:** MolmoAct2: Action Reasoning Models for Real-world Deployment
   **著者:** Haoquan Fang, Jiafei Duan, Donovan Clay, Sam Wang, Shuo Liu, Weikai Huang, Xiang Fan, Wei-Chuan Tsai, Shirui Chen, Yi Ru Wang, Shanli Xing, Jaemin Cho, Jae Sung Park, Ainaz Eftekhar, Peter Sushko, Karen Farley, Angad Wadhwa, Cole Harrison, Winson Han, Ying-Chun Lee, Eli VanderBilt, Rose Hendrix, Suveen Ellawela, Lucas Ngoo, Joyce Chai, Zhongzheng Ren, Ali Farhadi, Dieter Fox, Ranjay Krishna
   **概要:** ロボット制御の汎用化を目指すVision-Language-Action(VLA)モデルは、クローズドな最先端モデル、高価なハードウェア依存、推論遅延の大きさ、信頼性の低い成功率といった実運用上の課題を抱えていた。本研究は、完全オープンなアクション推論モデル「MolmoAct2」を提案し、空間・身体推論に特化した330万サンプルで訓練したVLMバックボーン「MolmoER」、720時間に及ぶ業界最大級のオープン双腕遠隔操作データセット、5つの身体形態にまたがる行動トークナイザ「OpenFAST」を整備した。アーキテクチャ面では、フローマッチングによる連続行動エキスパートをKVキャッシュ条件付けで離散トークンVLMに統合し、変化のあるシーン領域のみを再予測する適応深度推論機構「MolmoThink」を導入することで遅延を大幅削減している。7つのシミュレーション・実機ベンチマークで強力なベースラインを上回り、13の身体推論ベンチマークでGPT-5やGemini Robotics ER-1.5を凌駕した。重みやコード、訓練データを完全公開しており、実運用可能なオープンロボット基盤として今後の研究と産業応用を加速する意義は大きい。
   **arXiv:** https://arxiv.org/abs/2605.02881

2. **タイトル:** From Context to Skills: Can Language Models Learn from Context Skillfully?
   **著者:** Shuzheng Si, Haozhe Zhao, Yu Lei, Qingyi Wang, Dingwei Chen, Zhitong Wang, Zhenhailong Wang, Kangyang Luo, Zheng Wang, Gang Chen, Fanchao Qi, Minjia Zhang, Maosong Sun
   **概要:** 言語モデルがパラメトリック知識を超える複雑な文脈を扱うには、与えられた文脈から直接知識を学ぶ「文脈学習」が不可欠だが、長大かつ専門的な文脈に対する手動スキル注釈の高コストや、自動スキル構築における外部フィードバックの欠如が大きな障壁となっていた。本研究では、人手の介入や外部フィードバックなしに文脈固有のスキルを自律的に発見・洗練・選択する自己進化フレームワーク「Ctx2Skill」を提案する。中核には、課題と評価基準を生成するChallenger、進化するスキル集合を頼りに解を試みるReasoner、二値判定を下す中立Judgeから成るマルチエージェント自己対戦ループがあり、ProposerとGeneratorが失敗事例を分析してスキル更新を合成することで両側を進化させる。さらに、敵対的崩壊や過特化を防ぐためのCross-time Replay機構が、代表事例にわたって最良バランスのスキル集合を選定し、堅牢で汎化可能なスキル進化を実現する。CL-benchの4つの文脈学習タスクで、構築されたスキルを各種バックボーンに装着するだけで一貫して解決率が向上することを示し、教師なしの自動スキル獲得という新たな方向性を切り拓いた点で意義深い。
   **arXiv:** https://arxiv.org/abs/2604.27660

3. **タイトル:** Stream-R1: Reliability-Perplexity Aware Reward Distillation for Streaming Video Generation
   **著者:** Bin Wu, Mengqi Huang, Shaojin Wu, Weinan Jia, Yuxin Wang, Zhendong Mao, Yongdong Zhang
   **概要:** 自己回帰型ストリーミング動画拡散モデルの実用化には、分布マッチング蒸留(DMD)を中心とした蒸留ベースの高速化が基盤となっているが、既存手法はロールアウト・フレーム・ピクセルを一律に信頼できる教師信号として扱うため、品質向上に限界があった。本研究は、ロールアウト間の信頼度差(Inter-Reliability)と空間・時間方向に貢献度が異なる要素差(Intra-Perplexity)という二つの分散軸に着目し、共通の報酬モデルでこれらを動的に重み付けする「Stream-R1」を提案する。ロールアウト単位では事前学習済み動画報酬の指数で損失を再スケールし、要素単位では同じ報酬モデルから逆伝播されるピクセル勾配の顕著性を空間・時間重みに変換することで、改善余地の大きい領域とフレームに最適化圧力を集中させる。さらに、視覚品質・モーション品質・テキスト整合性のいずれかが支配的にならないよう適応的バランス機構を備えている。アーキテクチャ変更や追加推論コストなしに、標準的なストリーミング動画生成ベンチマークで蒸留ベースラインを三軸すべてで一貫して上回り、リアルタイム動画生成の品質向上に向けた汎用的な蒸留戦略として大きなインパクトを持つ。
   **arXiv:** https://arxiv.org/abs/2605.03849
