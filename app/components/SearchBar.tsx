"use client";
import { useState } from "react";

interface SentimentData {
  ticker: string;
  score: number;
  label: string;
  brief: string;
  posts: { source: string; text: string; url: string }[];
}

interface Props {
  onResult: (data: SentimentData) => void;
  onLoading: (loading: boolean) => void;
}

export default function SearchBar({ onResult, onLoading }: Props) {
  const [input, setInput] = useState("");

  async function handleScan() {
    if (!input.trim()) return;
    onLoading(true);
    const res = await fetch(`http://localhost:8000/sentiment/${input.toUpperCase()}`);
    const data = await res.json();
    onResult(data);
    onLoading(false);
    setInput("");
  }

  return (
    <div style={{ padding: "32px 32px 0 32px" }}>
      <div style={{ display: "flex", maxWidth: "600px" }}>
        <span style={{
          background: "#111", border: "1px solid #222", borderRight: "none",
          padding: "12px 16px", color: "#444", fontSize: "14px", borderRadius: "6px 0 0 6px",
        }}>$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === "Enter" && handleScan()}
          placeholder="ENTER TICKER... (e.g. AAPL)"
          style={{
            flex: 1, background: "#111", border: "1px solid #222", borderRight: "none",
            padding: "12px 16px", color: "#e0e0e0", fontSize: "14px", outline: "none",
            fontFamily: "'Courier New', monospace", letterSpacing: "2px",
          }}
        />
        <button onClick={handleScan} style={{
          background: "#00ff88", border: "none", padding: "12px 24px",
          color: "#080808", fontWeight: "800", fontSize: "13px", cursor: "pointer",
          fontFamily: "'Courier New', monospace", letterSpacing: "2px",
          borderRadius: "0 6px 6px 0",
        }}>
          SCAN
        </button>
      </div>
    </div>
  );
}