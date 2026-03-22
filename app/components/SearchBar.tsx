export default function SearchBar() {
  return (
    <div style={{ padding: "32px 32px 0 32px" }}>
      <div style={{ display: "flex", maxWidth: "600px" }}>
        <span style={{
          background: "#111",
          border: "1px solid #222",
          borderRight: "none",
          padding: "12px 16px",
          color: "#444",
          fontSize: "14px",
          borderRadius: "6px 0 0 6px",
        }}>
          $
        </span>
        <input
          placeholder="ENTER TICKER... (e.g. AAPL)"
          style={{
            flex: 1,
            background: "#111",
            border: "1px solid #222",
            borderRight: "none",
            padding: "12px 16px",
            color: "#e0e0e0",
            fontSize: "14px",
            outline: "none",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "2px",
          }}
        />
        <button style={{
          background: "#00ff88",
          border: "none",
          padding: "12px 24px",
          color: "#080808",
          fontWeight: "800",
          fontSize: "13px",
          cursor: "pointer",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "2px",
          borderRadius: "0 6px 6px 0",
        }}>
          SCAN
        </button>
      </div>
    </div>
  );
}