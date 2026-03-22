interface Props {
  ticker: string;
  score: number;
  label: string;
  brief: string;
}

export default function SentimentPanel({ ticker, score, label, brief }: Props) {
  const labelColor = label === "BULLISH" ? "#00ff88" : label === "BEARISH" ? "#ff4466" : "#ffd700";

  return (
    <div style={{
      margin: "20px 32px 0 32px",
      background: "#111",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      padding: "28px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#e0e0e0" }}>${ticker}</span>
            <span style={{ border: `1px solid ${labelColor}`, color: labelColor, padding: "3px 10px", fontSize: "10px", letterSpacing: "2px", borderRadius: "4px" }}>
              {label}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "36px", fontWeight: "800", color: labelColor }}>{score}</div>
          <div style={{ color: "#555", fontSize: "10px", letterSpacing: "2px" }}>SENTIMENT SCORE</div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "#ff4466", fontSize: "10px" }}>BEARISH</span>
          <span style={{ color: "#555", fontSize: "10px" }}>NEUTRAL</span>
          <span style={{ color: "#00ff88", fontSize: "10px" }}>BULLISH</span>
        </div>
        <div style={{ height: "6px", background: "#1a1a1a", borderRadius: "3px" }}>
          <div style={{
            height: "100%", width: `${score}%`,
            background: "linear-gradient(90deg, #ff4466, #ffd700 50%, #00ff88)",
            borderRadius: "3px", transition: "width 0.8s ease",
          }} />
        </div>
      </div>

      <div style={{ background: "#0a0a0a", borderLeft: "3px solid #00ff88", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
        <div style={{ color: "#555", fontSize: "10px", letterSpacing: "2px", marginBottom: "10px" }}>AI BRIEF</div>
        <p style={{ color: "#ccc", fontSize: "13px", lineHeight: "1.8", margin: 0 }}>{brief}</p>
      </div>
    </div>
  );
}