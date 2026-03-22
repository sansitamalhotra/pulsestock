import httpx
import os
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

BLOCKED_DOMAINS = [
    "rlsbb", "torrent", "pirate", "scene", "yts", "rarbg",
    "1337x", "kickass", "nyaa", "eztv", "limetorrent"
]

def get_news(ticker: str) -> list[dict]:
    url = "https://newsapi.org/v2/everything"
    params = {
       "q": f"{ticker} stock OR {ticker} earnings OR {ticker} investor",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 30,
        "apiKey": NEWS_API_KEY,
    }

    response = httpx.get(url, params=params)
    data = response.json()

    articles = []
    for article in data.get("articles", []):
        source = article["source"]["name"] or ""
        url_str = article.get("url", "")
        title = article.get("title", "") or ""

        if any(b in url_str.lower() for b in BLOCKED_DOMAINS):
            continue
        if any(b in source.lower() for b in BLOCKED_DOMAINS):
            continue
        if not title or title == "[Removed]":
            continue

        articles.append({
            "source": source,
            "text": title,
            "url": url_str,
        })

    return articles[:15]