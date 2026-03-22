from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.reddit import get_news
from app.sentiment import score_headlines
from app.brief import generate_brief
import yfinance as yf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pulsestock.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "PulseStock backend running"}

@app.get("/price/{ticker}")
def get_price(ticker: str):
    stock = yf.Ticker(ticker)
    info = stock.fast_info
    price = round(info.last_price, 2)
    prev_close = round(info.previous_close, 2)
    change = round(price - prev_close, 2)
    change_pct = round((change / prev_close) * 100, 2)
    return {
        "ticker": ticker.upper(),
        "price": price,
        "change": change,
        "change_pct": change_pct,
    }

@app.get("/sentiment/{ticker}")
def get_sentiment(ticker: str):
    headlines = get_news(ticker)
    score, label = score_headlines(headlines)
    brief = generate_brief(ticker, headlines)

    return {
        "ticker": ticker.upper(),
        "score": score,
        "label": label,
        "brief": brief,
        "posts": headlines[:4],
    }