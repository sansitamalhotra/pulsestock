import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_brief(ticker: str, headlines: list[dict]) -> str:
    if not headlines:
        return "Not enough data to generate a brief."
    headlines_text = "\n".join([f"- {h['text']}" for h in headlines[:10]])
    prompt = f"You are a financial sentiment analyst. Based on these recent news headlines about {ticker}, write a 2-3 sentence brief summarizing the current sentiment. Be specific about what is driving it and mention any key risks.\n\nHeadlines:\n{headlines_text}\n\nBrief:"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150,
    )
    return response.choices[0].message.content.strip()
