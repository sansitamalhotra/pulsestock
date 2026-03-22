const TICKERS = [
  { symbol: "AAPL", price: "189.43", change: "+1.23", up: true },
  { symbol: "TSLA", price: "172.18", change: "-4.56", up: false },
  { symbol: "SHOP", price: "94.22", change: "+0.87", up: true },
];

export default function TickerCards() {
  return (
    <div style={{
      display: "flex",
      gap: "12px",
      padding: "24px 32px",
      flexWrap: "wrap",
    }}>
      {TICKERS.map((ticker) => (
        <div key={ticker.symbol} style={{
          background: "#111",
          border: "1px solid #1a1a1a",
          borderRadius: "8px",
          padding: "14px 20px",
          cursor: "pointer",
          minWidth: "120px",
        }}>
          <div style={{ color: "#444", fontSize: "11px", marginBottom: "6px" }}>
            ${ticker.symbol}
          </div>
          <div style={{ color: "#e0e0e0", fontSize: "20px", fontWeight: "800" }}>
            {ticker.price}
          </div>
          <div style={{
            color: ticker.up ? "#00ff88" : "#ff4466",
            fontSize: "11px",
            marginTop: "4px",
          }}>
            {ticker.up ? "▲" : "▼"} {ticker.change}
          </div>
        </div>
      ))}
    </div>
  );
}