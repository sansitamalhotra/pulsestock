export default function SentimentPanel() {
  return (
    <div style={{
      margin: "0 32px",
      background: "#111",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      padding: "28px",
    }}>

      {/* Ticker + label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#e0e0e0" }}>
              $AAPL
            </span>
            <span style={{
              border: "1px solid #00ff88",
              color: "#00ff88",
              padding: "3px 10px",
              fontSize: "10px",
              letterSpacing: "2px",
              borderRadius: "4px",
            }}>
              BULLISH
            </span>
          </div>
          <div style={{ color: "#333", fontSize: "12px" }}>Apple Inc.</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#e0e0e0" }}>$189.43</div>
          <div style={{ color: "#00ff88", fontSize: "13px" }}>▲ $1.23 today</div>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "#ff4466", fontSize: "10px", letterSpacing: "1px" }}>BEARISH</span>
          <span style={{ color: "#555", fontSize: "10px", letterSpacing: "1px" }}>NEUTRAL</span>
          <span style={{ color: "#00ff88", fontSize: "10px", letterSpacing: "1px" }}>BULLISH</span>
        </div>
        <div style={{ height: "6px", background: "#1a1a1a", borderRadius: "3px" }}>
          <div style={{
            height: "100%",
            width: "74%",
            background: "linear-gradient(90deg, #ff4466, #ffd700 50%, #00ff88)",
            borderRadius: "3px",
          }} />
        </div>
        <div style={{ color: "#333", fontSize: "10px", marginTop: "8px" }}>
          BASED ON 3,388 REDDIT POSTS · LAST 24H
        </div>
      </div>

      {/* AI Brief */}
      <div style={{
        background: "#0a0a0a",
        borderLeft: "3px solid #00ff88",
        padding: "16px 20px",
        borderRadius: "0 8px 8px 0",
      }}>
        <div style={{ color: "#333", fontSize: "10px", letterSpacing: "2px", marginBottom: "10px" }}>
          AI BRIEF
        </div>
        <p style={{ color: "#999", fontSize: "13px", lineHeight: "1.8", margin: 0 }}>
          Reddit is strongly bullish on $AAPL this week, driven by anticipation of upcoming WWDC announcements and strong iPhone sales data. Sentiment shifted positive 36 hours ago. Key concern: valuation stretched at current levels, mentioned in 18% of posts.
        </p>
      </div>

    </div>
  );
}