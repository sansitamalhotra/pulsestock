import os
import json
import httpx
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()

@tool
def get_sentiment(ticker: str) -> str:
    """Get the current sentiment score, label, and AI brief for a stock ticker."""
    try:
        response = httpx.get(f"http://localhost:8000/sentiment/{ticker.upper()}", timeout=30)
        data = response.json()
        return json.dumps({
            "ticker": data["ticker"],
            "score": data["score"],
            "label": data["label"],
            "brief": data["brief"],
        })
    except Exception as e:
        return f"Error fetching sentiment for {ticker}: {str(e)}"

@tool
def get_price(ticker: str) -> str:
    """Get the current stock price and daily change for a ticker."""
    try:
        response = httpx.get(f"http://localhost:8000/price/{ticker.upper()}", timeout=10)
        data = response.json()
        return json.dumps({
            "ticker": data["ticker"],
            "price": data["price"],
            "change": data["change"],
            "change_pct": data["change_pct"],
        })
    except Exception as e:
        return f"Error fetching price for {ticker}: {str(e)}"

@tool
def compare_portfolio(tickers: str) -> str:
    """Compare sentiment and price for multiple tickers at once.
    Pass tickers as comma-separated string e.g. 'AAPL,TSLA,NVDA'"""
    results = []
    for ticker in tickers.split(","):
        ticker = ticker.strip().upper()
        try:
            s = httpx.get(f"http://localhost:8000/sentiment/{ticker}", timeout=30).json()
            p = httpx.get(f"http://localhost:8000/price/{ticker}", timeout=10).json()
            results.append({
                "ticker": ticker,
                "score": s["score"],
                "label": s["label"],
                "price": p["price"],
                "change_pct": p["change_pct"],
            })
        except Exception as e:
            results.append({"ticker": ticker, "error": str(e)})
    return json.dumps(results)

tools = [get_sentiment, get_price, compare_portfolio]

llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.3,
)

memory = MemorySaver()

agent = create_react_agent(
    llm,
    tools,
    checkpointer=memory,
    prompt="""You are PulseStock AI — a sharp financial sentiment analyst built into the PulseStock terminal.

You have access to:
- get_sentiment: real-time sentiment score, label, and AI brief for any ticker
- get_price: live price and daily change for any ticker  
- compare_portfolio: compare multiple tickers at once efficiently

Rules:
- Always use tools to get real data — never make up numbers
- Be concise and analytical — you're a terminal, not a chatbot
- Remember context from earlier in the conversation
- When comparing multiple tickers, use compare_portfolio for efficiency
- Format responses cleanly with ticker symbols in caps""",
)

def run_agent(query: str, session_id: str = "default") -> str:
    config = {"configurable": {"thread_id": session_id}}
    result = agent.invoke(
        {"messages": [{"role": "user", "content": query}]},
        config=config,
    )
    return result["messages"][-1].content