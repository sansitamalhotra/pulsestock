def score_headlines(headlines: list[dict]) -> tuple[int, str]:
    positive_words = ["surge", "gain", "rise", "up", "beat", "strong", "growth", "profit", "high", "buy", "bullish", "record", "jump"]
    negative_words = ["fall", "drop", "loss", "down", "miss", "weak", "decline", "low", "sell", "bearish", "crash", "cut", "risk"]

    positive = 0
    negative = 0

    for h in headlines:
        text = h["text"].lower()
        for word in positive_words:
            if word in text:
                positive += 1
        for word in negative_words:
            if word in text:
                negative += 1

    total = positive + negative
    if total == 0:
        score = 50
    else:
        score = int((positive / total) * 100)

    if score >= 60:
        label = "BULLISH"
    elif score <= 40:
        label = "BEARISH"
    else:
        label = "NEUTRAL"

    return score, label