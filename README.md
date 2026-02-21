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
🗺️ Project Roadmap
The development of Grin is divided into 6 strategic phases, moving from core infrastructure to advanced Graph AI implementation.

Phase 1: Infrastructure & Skeleton
[ ] Initialize FastAPI backend and React frontend.
[ ] Set up the base API architecture and data flow between client and server.

Phase 2: Real-time Data Visualization
[ ] Integrate yfinance API for seamless US market data fetching.
[ ] Implement interactive candlestick charts using Plotly or Lightweight Charts.

Phase 3: Technical Indicator Engine
[ ] Develop logic for calculating core indicators: RSI, Bollinger Bands, Volume Profile, and Support/Resistance levels.
[ ] Create a pre-processing pipeline to transform raw data into feature vectors.

Phase 4: Automation & Database Synchronization
[ ] Implement a cron-job scheduler for daily market data updates.
[ ] Optimize MySQL schema to handle historical and real-time data efficiently.

Phase 5: Predictive Analysis & Feature Engineering (The AI Core)
[ ] Analyze characteristics of historical data that achieved the target return (3-5%).
[ ] Develop a baseline machine learning model using PyTorch to identify high-probability swing setups.

Phase 6: Graph Intelligence (The GNN Phase)
[ ] Construct a Stock Relation Graph based on sectors, industries, and supply chains.
[ ] Implement GNN (Graph Neural Networks) using PyTorch Geometric to capture inter-stock correlation and market sentiment propagation.
