"use client";
import { useState, useEffect } from "react";

interface TickerData {
  ticker: string;
  price: number;
  change: number;
  change_pct: number;
}

const TICKERS = ["AAPL", "TSLA", "SHOP", "NVDA", "MSFT", "AMD"];

export default function TickerCards() {
  const [prices, setPrices] = useState<Record<string, TickerData>>({});

  useEffect(() => {
    TICKERS.forEach(async (ticker) => {
      try {
        const res = await fetch(`http://localhost:8000/price/${ticker}`);
        const data = await res.json();
        setPrices((prev) => ({ ...prev, [ticker]: data }));
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <div style={{
      borderTop: "1px solid #111",
      borderBottom: "1px solid #111",
      display: "flex",
      overflowX: "auto",
      position: "relative",
      zIndex: 10,
      background: "#080808",
    }}>
      {TICKERS.map((ticker, i) => {
        const d = prices[ticker];
        const positive = d ? d.change >= 0 : true;
        return (
          <div key={ticker} style={{
            flex: 1, minWidth: "140px",
            padding: "16px 24px",
            borderRight: i < TICKERS.length - 1 ? "1px solid #111" : "none",
          }}>
            <div style={{ color: "#666", fontSize: "10px", letterSpacing: "2px", marginBottom: "6px" }}>
              ${ticker}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#e0e0e0", marginBottom: "3px" }}>
              {d ? d.price.toFixed(2) : "···"}
            </div>
            <div style={{ fontSize: "11px", color: d ? (positive ? "#00ff88" : "#ff4466") : "#333" }}>
              {d ? `${positive ? "▲" : "▼"} ${d.change > 0 ? "+" : ""}${d.change.toFixed(2)} (${d.change_pct.toFixed(2)}%)` : "loading"}
            </div>
          </div>
        );
      })}
    </div>
  );
}