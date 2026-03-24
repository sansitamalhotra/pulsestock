"use client";
import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_URL || "https://pulsestock-api.onrender.com";   
interface Props {
  onResult: (data: any) => void;
  onLoading: (loading: boolean) => void;
}

export default function SearchBar({ onResult, onLoading }: Props) {
  const [input, setInput] = useState("");

  async function handleScan() {
    if (!input.trim()) return;
    onLoading(true);
    const res = await fetch(`${API}/sentiment/${input.toUpperCase()}`);
    const data = await res.json();
    onResult(data);
    onLoading(false);
    setInput("");
  }
  return (
    <div style={{ padding: "0 32px" }}>
      <div style={{ display: "flex", maxWidth: "520px", margin: "0 auto" }}>
        <span style={{
          background: "#111", border: "1px solid #2a2a2a", borderRight: "none",
          padding: "14px 18px", color: "#555", fontSize: "16px", borderRadius: "8px 0 0 8px",
        }}>$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === "Enter" && handleScan()}
          placeholder="ENTER TICKER... (e.g. AAPL)"
          style={{
            flex: 1, background: "#111", border: "1px solid #2a2a2a", borderRight: "none",
            padding: "14px 18px", color: "#e0e0e0", fontSize: "14px", outline: "none",
            fontFamily: "'Courier New', monospace", letterSpacing: "2px",
          }}
        />
        <button onClick={handleScan} style={{
          background: "#00ff88", border: "none", padding: "14px 28px",
          color: "#080808", fontWeight: "900", fontSize: "13px", cursor: "pointer",
          fontFamily: "'Courier New', monospace", letterSpacing: "2px",
          borderRadius: "0 8px 8px 0",
        }}>
          SCAN
        </button>
      </div>
      <div style={{ color: "#2a2a2a", fontSize: "10px", letterSpacing: "2px", marginTop: "10px", textAlign: "center" }}>
        TRY: AAPL · TSLA · NVDA · SHOP · AMD · MSFT
      </div>
    </div>
  );
}   