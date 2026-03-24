"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL || "https://pulsestock-api.onrender.com";

interface WatchItem {
  ticker: string;
  score: number;
  label: string;
  price: number;
  change_pct: number;
}

export default function Watchlist() {
  const [open, setOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, WatchItem>>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pulsestock-watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    watchlist.forEach(ticker => {
      if (!data[ticker]) fetchTicker(ticker);
    });
  }, [watchlist]);

  async function fetchTicker(ticker: string) {
    setLoading(ticker);
    try {
      const [s, p] = await Promise.all([
        fetch(`${API}/sentiment/${ticker}`).then(r => r.json()),
        fetch(`${API}/price/${ticker}`).then(r => r.json()),
      ]);
      setData(prev => ({
        ...prev,
        [ticker]: { ticker, score: s.score, label: s.label, price: p.price, change_pct: p.change_pct }
      }));
    } catch {}
    setLoading(null);
  }

  function addTicker() {
    const t = input.trim().toUpperCase();
    if (!t || watchlist.includes(t)) return;
    const updated = [...watchlist, t];
    setWatchlist(updated);
    localStorage.setItem("pulsestock-watchlist", JSON.stringify(updated));
    setInput("");
  }

  function removeTicker(ticker: string) {
    const updated = watchlist.filter(t => t !== ticker);
    setWatchlist(updated);
    localStorage.setItem("pulsestock-watchlist", JSON.stringify(updated));
    setData(prev => { const d = { ...prev }; delete d[ticker]; return d; });
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed", bottom: "24px", left: "24px", zIndex: 100,
          background: "#111", border: "1px solid #2a2a2a", borderRadius: "50px",
          padding: "12px 20px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "8px",
          fontFamily: "'Courier New', monospace", fontWeight: "800",
          fontSize: "12px", letterSpacing: "2px", color: "#e0e0e0",
        }}
      >
        ★ WATCHLIST {watchlist.length > 0 && <span style={{ color: "#00ff88" }}>{watchlist.length}</span>}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", bottom: "80px", left: "24px", zIndex: 99,
              width: "340px", maxHeight: "480px",
              background: "#0a0a0a", border: "1px solid #1a1a1a",
              borderRadius: "16px", display: "flex", flexDirection: "column",
              overflow: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.8)",
            }}
          >
            {/* header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #111" }}>
              <div style={{ color: "#e0e0e0", fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "2px", fontWeight: "800", marginBottom: "12px" }}>
                ★ WATCHLIST
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && addTicker()}
                  placeholder="ADD TICKER..."
                  style={{
                    flex: 1, background: "#111", border: "1px solid #222",
                    borderRadius: "8px", padding: "8px 12px",
                    color: "#e0e0e0", fontSize: "12px", outline: "none",
                    fontFamily: "'Courier New', monospace",
                  }}
                />
                <button onClick={addTicker} style={{
                  background: "#00ff88", border: "none", borderRadius: "8px",
                  padding: "8px 14px", cursor: "pointer",
                  color: "#080808", fontWeight: "800", fontSize: "12px",
                }}>+</button>
              </div>
            </div>

            {/* list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {watchlist.length === 0 && (
                <div style={{ color: "#333", fontSize: "11px", fontFamily: "'Courier New', monospace", textAlign: "center", padding: "20px" }}>
                  No tickers yet. Add AAPL, TSLA, etc.
                </div>
              )}
              {watchlist.map(ticker => {
                const d = data[ticker];
                const color = d?.label === "BULLISH" ? "#00ff88" : d?.label === "BEARISH" ? "#ff4466" : "#ffd700";
                return (
                  <motion.a
                    key={ticker}
                    href={`/${ticker.toLowerCase()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 12px", borderRadius: "8px", marginBottom: "6px",
                      background: "#111", textDecoration: "none", cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ color: "#e0e0e0", fontSize: "13px", fontWeight: "800", fontFamily: "'Courier New', monospace" }}>${ticker}</div>
                      <div style={{ color: "#444", fontSize: "10px" }}>{d ? `$${d.price}` : loading === ticker ? "loading..." : "—"}</div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "12px" }}>
                      {d && (
                        <div>
                          <div style={{ color, fontSize: "16px", fontWeight: "800" }}>{d.score}</div>
                          <div style={{ color, fontSize: "9px", letterSpacing: "1px" }}>{d.label}</div>
                        </div>
                      )}
                      <button
                        onClick={e => { e.preventDefault(); removeTicker(ticker); }}
                        style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: "14px" }}
                      >×</button>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}   