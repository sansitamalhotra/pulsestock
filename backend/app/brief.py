from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_brief(ticker: str, headlines: list[dict]) -> str:
    if not headlines:
        return "Not enough data to generate a brief."
    headlines_text = "\n".join([f"- {h['text']}" for h in headlines[:10]])
    prompt = f"You are a financial sentiment analyst. Based on these recent news headlines about {ticker}, write a 2-3 sentence brief summarizing the current sentiment.\n\nHeadlines:\n{headlines_text}\n\nBrief:"
    response = client.models.generate_content(model="gemini-2.5-pro-exp-03-25", contents=prompt)
    return response.text.strip()
