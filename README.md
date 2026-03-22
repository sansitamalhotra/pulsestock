# PulseStock — Real-Time Stock Sentiment Terminal

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

**Live:** [pulsestock.vercel.app](https://pulsestock.vercel.app) &nbsp;|&nbsp; **API:** [pulsestock-api.onrender.com](https://pulsestock-api.onrender.com)

---

## What Is This?

Most people find out how a stock is doing after the fact. PulseStock lets you know the vibe *before* you make a move.

Type any ticker. In under 30 seconds, you get:
- A live sentiment score (0–100, BEARISH to BULLISH)
- An AI-generated analyst brief summarizing what's driving the mood
- The top headlines behind the signal
- Live price data with change and percentage

It's a Bloomberg terminal for people who don't have Bloomberg.

---

## Features

- **Real-time news ingestion** — pulls live headlines from NewsAPI on every search, filtered to financial sources only
- **Sentiment scoring engine** — custom keyword-based NLP pipeline scores bullish/bearish/neutral signal
- **AI analyst brief** — GPT-4o-mini synthesizes headlines into a 2-3 sentence analyst-style summary
- **Live stock prices** — yfinance integration with price, daily change, and percentage
- **Bloomberg-style UI** — animated ticker bar, scrolling sentiment cards, Framer Motion mini charts
- **Fully deployed** — Vercel (frontend) + Render (backend)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15, TypeScript, Framer Motion |
| Backend | FastAPI, Python 3.14 |
| AI Brief | OpenAI GPT-4o-mini |
| News Data | NewsAPI |
| Price Data | yfinance |
| Deployment | Vercel + Render |

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
npm install
npm run dev
```

Open `http://localhost:3000`

---

## Project Structure

```
pulsestock/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Pulsing logo + live indicator
│   │   ├── SearchBar.tsx       # Ticker input + scan button
│   │   ├── TickerCards.tsx     # Live price bar (yfinance)
│   │   ├── SentimentPanel.tsx  # Score bar + AI brief
│   │   └── PostsList.tsx       # Top headlines
│   └── page.tsx                # Hero landing + results view
├── backend/
│   └── app/
│       ├── main.py             # FastAPI routes
│       ├── reddit.py           # NewsAPI ingestion + filtering
│       ├── sentiment.py        # NLP scoring engine
│       └── brief.py            # GPT-4o-mini brief generation
└── README.md
```

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /sentiment/{ticker}` | Score, label, AI brief, top headlines |
| `GET /price/{ticker}` | Live price, daily change, percentage |

---

## Roadmap

- [ ] FinBERT NLP model for deeper sentiment scoring
- [ ] Historical sentiment trend charts
- [ ] Reddit integration (r/wallstreetbets, r/CanadianInvestor)
- [ ] Email/SMS alerts for sentiment shifts
- [ ] Portfolio watchlist with aggregate sentiment score

---

## Built By

**Sansita Malhotra** — Computer Engineering @ University of Toronto

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sansitamalhotra)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/sansitamalhotra)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00ff88?style=for-the-badge&logoColor=black)](https://sansitamalhotra.com)
