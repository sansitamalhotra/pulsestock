# PulseStock — Real-Time Stock Sentiment Terminal

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

**Live:** [pulsestock.vercel.app](https://pulsestock.vercel.app) &nbsp;|&nbsp; **API:** [pulsestock-api.onrender.com](https://pulsestock-api.onrender.com)

> Know the vibe before the move.

---

<img width="1470" height="738" alt="Landing" src="https://github.com/user-attachments/assets/94fed1c5-19e4-43bf-9869-9141313e6d8c" />
<img width="1470" height="730" alt="AAPL Result" src="https://github.com/user-attachments/assets/5cb479c6-6804-4884-8e39-c588957bdd1f" />
<img width="1459" height="736" alt="NVDA Result" src="https://github.com/user-attachments/assets/39cc0abd-ee05-470e-b8a4-d2fb0b303c55" />
<img width="419" height="625" alt="Watchlist" src="https://github.com/user-attachments/assets/afca0191-cd9d-4397-8d1f-70a1ab9f554a" />
<img width="343" height="404" alt="AI Agent Chat" src="https://github.com/user-attachments/assets/91e527ae-75cb-4cf2-83f7-c68aade7abc4" />
<img width="1470" height="240" alt="Ticker Bar" src="https://github.com/user-attachments/assets/a4af8e80-ba82-469c-bb72-e5144426331f" />

---

## What Is This?

Most people find out how a stock is doing after the fact. PulseStock lets you know the vibe *before* you make a move.

Type any ticker. In under 30 seconds, you get:
- A live sentiment score (0–100, BEARISH to BULLISH)
- An AI-generated analyst brief summarizing what's driving the mood
- The top headlines behind the signal
- Live price data with daily change and percentage

Then ask the AI agent anything — compare tickers, dig deeper, ask follow-up questions. It remembers the conversation.

---

## Features

- **Real-time news ingestion** — pulls live headlines from NewsAPI on every scan, filtered to financial sources only
- **Sentiment scoring engine** — custom keyword-based NLP pipeline scores bullish/bearish/neutral signal
- **AI analyst brief** — GPT-4o-mini synthesizes headlines into a 2-3 sentence analyst-style summary
- **Live stock prices** — yfinance integration with price, daily change, and percentage
- **AI agent with memory** — LangChain + LangGraph ReAct agent with tool calling across 3 tools and persistent session memory
- **Shareable URLs** — every scan generates a shareable link e.g. `pulsestock.vercel.app/aapl`
- **Watchlist** — save tickers and see all sentiment scores + prices at a glance, persisted in localStorage
- **Scan history** — last 5 scanned tickers shown as quick-access chips under the search bar
- **Bloomberg-style UI** — animated ticker bar, scrolling sentiment cards, Framer Motion mini charts
- **Fully deployed** — Vercel (frontend) + Render (backend)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15, TypeScript, Framer Motion |
| Backend | FastAPI, Python 3.14 |
| AI Brief | OpenAI GPT-4o-mini |
| AI Agent | LangChain, LangGraph, MemorySaver |
| News Data | NewsAPI |
| Price Data | yfinance |
| Deployment | Vercel (frontend) + Render (backend) |

---

## AI Agent

The agent uses a ReAct (Reasoning + Acting) loop — it decides which tools to call, calls them, reasons over the results, and responds. Memory is persisted per session so follow-up questions work naturally.

```
User: "Compare AAPL vs TSLA"
  → Agent calls get_sentiment("AAPL")
  → Agent calls get_sentiment("TSLA")
  → Agent calls get_price("AAPL")
  → Agent calls get_price("TSLA")
  → Agent synthesizes comparison with scores, labels, prices

User: "Which one would you watch more closely?"
  → Agent remembers previous context and reasons over both results
```

---

## Running Locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:
```
NEWS_API_KEY=your_newsapi_key
OPENAI_API_KEY=your_openai_key
```

```bash
python3 -m uvicorn app.main:app --reload
```

### Frontend

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm install
npm run dev
```

Open `http://localhost:3000`

---

## Project Structure

```
pulsestock/
├── app/
│   ├── [ticker]/
│   │   └── page.tsx            # Shareable ticker pages
│   ├── components/
│   │   ├── Header.tsx          # Pulsing logo + live indicator
│   │   ├── SearchBar.tsx       # Ticker input + scan history
│   │   ├── TickerCards.tsx     # Live price bar (yfinance)
│   │   ├── SentimentPanel.tsx  # Score bar + AI brief
│   │   ├── PostsList.tsx       # Top headlines
│   │   ├── AgentChat.tsx       # AI agent chat UI with suggested prompts
│   │   └── Watchlist.tsx       # Saved tickers panel
│   └── page.tsx                # Hero landing + results view
├── backend/
│   └── app/
│       ├── main.py             # FastAPI routes
│       ├── reddit.py           # NewsAPI ingestion + filtering
│       ├── sentiment.py        # NLP scoring engine
│       ├── brief.py            # GPT-4o-mini brief generation
│       └── agent.py            # LangChain ReAct agent + tools
└── README.md
```

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /sentiment/{ticker}` | Score, label, AI brief, top headlines |
| `GET /price/{ticker}` | Live price, daily change, percentage |
| `GET /agent?q={query}&session_id={id}` | AI agent with persistent memory |

---

## Roadmap

- [ ] FinBERT NLP model for deeper sentiment scoring
- [ ] Historical sentiment trend charts
- [ ] Reddit integration (r/wallstreetbets, r/CanadianInvestor)
- [ ] Email/SMS alerts for sentiment shifts

---

## Built By

**Sansita Malhotra** — Computer Engineering @ University of Toronto

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sansitamalhotra)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/sansitamalhotra)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00ff88?style=for-the-badge&logoColor=black)](https://sansam.vercel.app/)
