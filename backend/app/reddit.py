import httpx
import os
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def get_news(ticker: str) -> list[dict]:
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": ticker,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 20,
        "apiKey": NEWS_API_KEY,
    }

    response = httpx.get(url, params=params)
    data = response.json()

    articles = []
    for article in data.get("articles", []):
        articles.append({
            "source": article["source"]["name"],
            "text": article["title"],
            "url": article["url"],
        })

    return articles