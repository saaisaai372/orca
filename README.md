# 🐋 ORCA: Oceanic Risk & Condition Analyzer

**SIH26176 Project**

ORCA is an advanced Agentic AI platform designed to analyze complex marine and satellite data (such as Sea Surface Temperature, Chlorophyll levels, Weather patterns, and Satellite imagery). It processes this data through a multi-agent system to provide real-time, actionable insights for various stakeholders.

## 🚀 Features

ORCA provides specialized intelligence dashboards for:
- 🎣 **Fishermen**: Catch advisories, safe fishing zones, and real-time storm warnings.
- 🏛️ **Coastal Authorities**: Disaster management alerts, marine ecology monitoring, and escalation protocols.
- ⚓ **Maritime Operators**: AI-optimized shipping routes, hazard detection, and weather routing.
- 🔬 **Researchers**: Satellite data pipelines, trend analysis, and oceanographic parameter tracking.

## 🧠 The Agentic AI System

Instead of a single AI model, ORCA utilizes a multi-agent workflow:
1.  **Data Analyst Agent**: Ingests and processes raw marine data streams.
2.  **Marine Biologist Agent**: Analyzes ecological indicators (e.g., coral bleaching risks based on SST/Chlorophyll anomalies).
3.  **Meteorology Agent**: Forecasts weather systems and sea state conditions.
4.  **Stakeholder Advisor Agent**: Synthesizes the analysis and delivers tailored recommendations to end-users.

## 💻 Tech Stack

*   **Frontend Dashboard**: React, Vite, Tailwind CSS v4, Recharts, Leaflet (Interactive Maps).
*   **Backend AI Engine**: Python, FastAPI, LangChain (for Agent Orchestration).

## 🛠️ How to Run Locally

### 1. Frontend (Marine Dashboard)
```bash
cd frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173` (or the port specified by Vite).

### 2. Backend (Agentic AI API)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

---
*Built as a final-year Agentic AI problem statement solution.*