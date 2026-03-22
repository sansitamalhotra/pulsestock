from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.reddit import get_news
from app.sentiment import score_headlines
from app.brief import generate_brief

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "PulseStock backend running"}

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