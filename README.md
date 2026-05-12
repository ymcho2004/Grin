# Grin (Graph Insight) 📈 😊

**Grin** is an AI-powered stock analysis platform specifically designed for the US market. It provides "Swing & Day Trading" guides by analyzing stock relations and technical indicators.

### 🎯 Project Motivation & Purpose
1️⃣ Why the US Market?
The US stock market (S&P 500, NASDAQ) represents the most liquid and structurally rich financial ecosystem in the world.
High trading volume, sector diversity, and transparent financial reporting make it an optimal environment for modeling inter-asset relationships and testing graph-based deep learning architectures.
→ Key Advantage: Clean, abundant, structured data for scalable experimentation.

2️⃣ From “What Happened” to “Why It Will Happen”
Most retail-facing platforms (e.g., Toss, Yahoo Finance) provide retrospective explanations — analyzing price movements after they occur.
Grin shifts the paradigm toward predictive relational modeling by identifying:
* Leading technical signals
* Sector rotation patterns
* Inter-stock correlation clusters
* The objective is to detect high-probability swing setups before the price move materializes.

3️⃣ Mastering Graph Neural Networks
Equities do not move independently.
They exist within a dynamic network shaped by:
*Sector classification
*Supply chain dependencies
*Institutional capital flows
*Market sentiment propagation

Grin constructs a Stock Relation Graph where:
*Nodes represent equities
*Edges encode structural and statistical relationships
*Graph Neural Networks (GNNs) are then used to model non-linear interactions and message passing across the market structure.

4️⃣ Explainable AI for Trustworthy Signals
Predictive accuracy alone is insufficient.
Grin integrates:
*Classical technical indicators (RSI, Bollinger Bands)
*Graph-based relational attention
*Feature attribution techniques

This enables users to understand why a recommendation was generated, not just what was predicted.

### 🌟 Key Features
* **Graph-based Relation Analysis:** Utilizing GNN to model relationships between sectors and supply chains.
* **Explainable AI (XAI):** Providing clear reasons for stock picks based on RSI, Bollinger Bands, and Volume Profile.
* **3-5% Swing Guide:** Identifying short-term profit opportunities within S&P 500 sectors.

### 🛠 Tech Stack
- **Frontend:** React.js (Planned)
- **Backend:** FastAPI (Python)
- **AI/ML:** PyTorch Geometric (GNN), Scikit-learn, yfinance
- **Database:** MySQL

### 📅 Roadmap
The development of Grin is divided into 6 strategic phases, transitioning from fundamental data structures to an automated Graph AI trading system. All progress and technical engineering logs are tracked via GitHub Issues.

Phase 0: Core Data Structure & Fundamentals (Completed)

[✅] [Data Structure] What is Graph? #1

[✅] [Data Structure] Graph Traversal and ADT Implementation (C) #2

Phase 1: Data Pipeline & Infrastructure

[ ] [Data] S&P 500 Core Stocks 5-Year OHLCV Data Collection via yfinance API #3

[ ] [Data] Time-Series Data Interpolation & Feature Scaling (MinMax/Standard) #4

[ ] [Data] Macroeconomic Indicators (VIX, Interest Rates) API Integration #5

Phase 2: Graph Construction & Feature Engineering

[ ] [Feature] Correlation-based Adjacency Matrix Extraction #6

[ ] [Feature] Technical Indicators (RSI, MACD, BB) to Node Feature Vectors #7

[ ] [Impl] PyTorch Geometric (PyG) Data Object & Tensor Conversion #8

Phase 3: AI Modeling (The GNN Core)

[ ] [Model] GAT (Graph Attention Network) based Edge Weight Self-Learning Architecture #9

[ ] [Model] Spatio-Temporal Model (GNN + LSTM/GRU) Design for Time-Series #10

[ ] [Train] Rolling Window Training Loop & Loss Optimization Setup #11

Phase 4: Backtesting & Risk Management (The Quant Heart)

[ ] [Backtest] Local Backtesting Environment Setup using Backtrader #12

[ ] [Logic] Dynamic Stop-Loss & MDD Minimization Rules (Hardcoded) #13

[ ] [Analysis] Benchmark (S&P 500) Comparison & Automated Report Generation #14

Phase 5: Live Trading & Deployment

[ ] [API] Alpaca Paper Trading API Integration & Real-time Order Execution #15

[ ] [Deploy] 24/7 Trading Bot Deployment on Cloud (AWS/GCP) with Slack Alerts #16
