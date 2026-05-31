## 今週のAI論文トレンド

1. **タイトル:** Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players
   **著者:** Fangfu Liu, Kai He, Tianchang Shen, Tianshi Cao, Sanja Fidler, Yueqi Duan, Jun Gao, Igor Gilitschenski, Zian Wang, Xuanchi Ren (NVIDIA)
   **概要:** インタラクティブな動画生成における世界モデルは、これまで単一の制御信号から将来の観測を生成する単一エージェント設定が中心であった。しかし、複数のプレイヤーやロボット、身体性エージェントが共有空間内で同時に行動する環境では、マルチエージェント対応が不可欠となる。本研究はNVIDIAが提案する生成的マルチエージェント世界モデルであり、各エージェントを正単体の頂点として回転角空間に配置するパラメータフリーな3D RoPE拡張「Simplex Rotary Agent Encoding」を導入する。これにより、学習済みのスロット固有IDや固定的なエージェント順序を必要とせず、置換対称性を保ったままスケーラブルなエージェント識別を実現する。さらに、学習可能なハブトークンがエージェント間のトークン相互作用を仲介する「Sparse Hub Attention」により、エージェント数に対して二次オーダーだったコストを線形に削減する。フルコンテキストの拡散教師モデルをKVキャッシュを用いた因果的な生徒モデルへ蒸留することで、24FPSのリアルタイム応答生成を可能とした。実験では、2人から4人プレイヤーへ追加学習なしで汎化しつつ、動画の忠実度・行動制御性・エージェント間整合性のいずれもスロットベースおよび密なAttentionのベースラインを上回ることを示した。
   **arXiv:** https://arxiv.org/abs/2605.28816

2. **タイトル:** SkillOpt: Executive Strategy for Self-Evolving Agent Skills
   **著者:** Yifan Yang, Ziyang Gong, Weiquan Huang, Qihao Yang, Ziwei Zhou, Zisu Huang, Yan Li, Xuemei Gao, Qi Dai, Bei Liu, Kai Qiu, Yuqing Yang, Dongdong Chen, Xue Yang, Chong Luo (Microsoft Research)
   **概要:** 現在のエージェントスキルは手作業で作成されるか、一発生成されるか、緩く制御された自己改訂で進化させるかのいずれかであり、深層学習のオプティマイザのようにフィードバック下で確実に改善する仕組みを欠いていた。本研究は、スキルを凍結したエージェントの「外部状態」とみなし、重み空間最適化と同等の規律で学習させることを提案する。SkillOptは著者らの知る限り初の体系的かつ制御可能なテキスト空間オプティマイザであり、独立したオプティマイザモデルがスコア付きロールアウトを単一スキル文書への追加・削除・置換の境界付き編集へ変換し、検証スコアが厳密に改善する場合のみ編集を採用する。テキスト版の学習率予算、却下編集バッファ、エポック単位のスロー/メタ更新により、デプロイ時の推論コストをゼロに保ちつつ安定したスキル学習を実現する。6つのベンチマーク、7つの対象モデル、3つの実行環境（直接チャット、Codex、Claude Code）の全52セルで最良または同点首位を達成し、人手・一発LLM・TextGrad・GEPAなど全競合を上回った。GPT-5.5では無スキル時から直接チャットで+23.5点、Codexで+24.8点、Claude Codeで+19.1点の改善を示し、最適化済みスキルがモデル規模・実行環境・近接タスク間で再利用可能であることも確認された。
   **arXiv:** https://arxiv.org/abs/2605.23904

3. **タイトル:** DVAO: Dynamic Variance-adaptive Advantage Optimization for Multi-reward Reinforcement Learning
   **著者:** Guochao Jiang, Jingyi Song, Guofeng Quan, Chuzhan Hao, Guohua Liu, Yuewei Zhang
   **概要:** 強化学習は大規模言語モデルを人間の意図やタスク要件に整合させる標準的手法となっているが、Group Relative Policy Optimization（GRPO）を実世界の多目的報酬設定へ適応させることは依然として困難である。従来のスカラー化手法のうち、報酬結合（Reward Combination）はアドバンテージの二乗値が過大になり学習が不安定化しやすく、アドバンテージ結合（Advantage Combination）は静的なハイパーパラメータに依存し目的間の相関を無視するという欠点があった。本研究が提案するDynamic Variance-adaptive Advantage Optimization（DVAO）は、ロールアウトグループ内における各目的の経験的報酬分散に基づいて結合重みを動的に調整し、学習信号の強い目的を強調しノイズの多い目的を抑制する。著者らはDVAOがアドバンテージの大きさを有界に保ち安定した学習を実現することを数学的に証明し、自己適応的な目的間正則化機構を導入した。Qwen3およびQwen2.5モデルを用いた数学的推論およびツール利用のベンチマークでの広範な実験により、DVAOがベースラインを大幅に上回り、優れた多目的パレートフロンティアと頑健な学習安定性を達成することを示した。
   **arXiv:** https://arxiv.org/abs/2605.25604
