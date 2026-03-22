const POSTS = [
  { sub: "r/wallstreetbets", text: "AAPL printing money, loading calls before WWDC 🚀", votes: 4200, sentiment: "positive" },
  { sub: "r/stocks", text: "Apple's services revenue quietly becoming the real story here", votes: 1830, sentiment: "positive" },
  { sub: "r/investing", text: "Trimming my AAPL position — valuation doesn't make sense at these levels", votes: 920, sentiment: "negative" },
  { sub: "r/CanadianInvestor", text: "Holding AAPL long term, nothing changes my thesis", votes: 540, sentiment: "neutral" },
];

export default function PostsList() {
  return (
    <div style={{
      margin: "20px 32px 32px 32px",
      background: "#111",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <div style={{ color: "#333", fontSize: "10px", letterSpacing: "3px", marginBottom: "16px" }}>
        TOP REDDIT POSTS // DRIVING SENTIMENT
      </div>

      {POSTS.map((post, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "14px 0",
          borderBottom: i < POSTS.length - 1 ? "1px solid #1a1a1a" : "none",
        }}>
          {/* Sentiment dot */}
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            marginTop: "5px",
            flexShrink: 0,
            background: post.sentiment === "positive" ? "#00ff88" : post.sentiment === "negative" ? "#ff4466" : "#ffd700",
          }} />

          <div style={{ flex: 1 }}>
            <div style={{ color: "#333", fontSize: "10px", marginBottom: "4px" }}>
              {post.sub}
            </div>
            <div style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.5" }}>
              {post.text}
            </div>
          </div>

          <div style={{ color: "#333", fontSize: "11px", flexShrink: 0 }}>
            ↑ {post.votes.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}