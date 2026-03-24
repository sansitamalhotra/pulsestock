"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TickerCards from "./components/TickerCards";
import SentimentPanel from "./components/SentimentPanel";
import PostsList from "./components/PostsList";
import AgentChat from "./components/AgentChat";

interface SentimentData {
  ticker: string;
  score: number;
  label: string;
  brief: string;
  posts: { source: string; text: string; url: string }[];
}

const BG_TICKERS = [
  { ticker: "AAPL", score: 78, label: "BULLISH" },
  { ticker: "TSLA", score: 31, label: "BEARISH" },
  { ticker: "NVDA", score: 91, label: "BULLISH" },
  { ticker: "MSFT", score: 62, label: "BULLISH" },
  { ticker: "META", score: 44, label: "NEUTRAL" },
  { ticker: "AMZN", score: 85, label: "BULLISH" },
  { ticker: "SHOP", score: 23, label: "BEARISH" },
  { ticker: "AMD", score: 67, label: "BULLISH" },
  { ticker: "GOOGL", score: 55, label: "NEUTRAL" },
  { ticker: "NFLX", score: 38, label: "BEARISH" },
  { ticker: "CRM", score: 72, label: "BULLISH" },
  { ticker: "UBER", score: 49, label: "NEUTRAL" },
];

function BgTickerCard({ ticker, score, label }: { ticker: string; score: number; label: string }) {
  const color = label === "BULLISH" ? "#00ff88" : label === "BEARISH" ? "#ff4466" : "#ffd700";
  return (
    <div style={{
      background: "#0d0d0d", border: "1px solid #141414", borderRadius: "10px",
      padding: "12px 16px", minWidth: "130px", margin: "0 6px", flexShrink: 0,
    }}>
      <div style={{ color: "#333", fontSize: "9px", letterSpacing: "2px", marginBottom: "4px" }}>${ticker}</div>
      <div style={{ color, fontSize: "18px", fontWeight: "800", marginBottom: "4px" }}>{score}</div>
      <div style={{ border: `1px solid ${color}`, color, fontSize: "8px", letterSpacing: "2px", padding: "2px 6px", borderRadius: "3px", display: "inline-block" }}>{label}</div>
    </div>
  );
}

const BULLISH_POINTS = "M 0,45 L 10,42 L 20,38 L 30,35 L 40,30 L 50,28 L 60,22 L 70,18 L 80,14 L 90,10 L 100,8 L 110,5 L 120,3";
const BEARISH_POINTS = "M 0,5 L 10,8 L 20,12 L 30,15 L 40,20 L 50,22 L 60,28 L 70,32 L 80,36 L 90,40 L 100,43 L 110,46 L 120,48";

function MiniChart({ bullish }: { bullish: boolean }) {
  const color = bullish ? "#00ff88" : "#ff4466";
  const d = bullish ? BULLISH_POINTS : BEARISH_POINTS;
  const w = 120, h = 50;

  return (
    <div style={{
      background: "#0d0d0d", border: "1px solid #141414", borderRadius: "10px",
      padding: "12px 16px", margin: "0 6px", flexShrink: 0,
    }}>
      <svg width={w} height={h}>
        <defs>
          <linearGradient id={`g${bullish}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={d + ` L ${w},${h} L 0,${h} Z`} fill={`url(#g${bullish})`} />
        <motion.path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        />
      </svg>
    </div>
  );
}
function ScrollingRow({ items, direction }: { items: React.ReactNode[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        style={{ display: "flex", alignItems: "center" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(false);

  const row1 = BG_TICKERS.slice(0, 6).flatMap((t, i) => [
    <BgTickerCard key={`t${i}`} {...t} />,
    <MiniChart key={`c${i}`} bullish={t.label === "BULLISH"} />,
  ]);

  const row2 = BG_TICKERS.slice(6).flatMap((t, i) => [
    <MiniChart key={`c${i}`} bullish={t.label === "BULLISH"} />,
    <BgTickerCard key={`t${i}`} {...t} />,
  ]);

  const row3 = [...BG_TICKERS].reverse().slice(0, 6).flatMap((t, i) => [
    <BgTickerCard key={`t${i}`} {...t} />,
    <MiniChart key={`c${i}`} bullish={t.score > 50} />,
  ]);

  return (
    <main style={{ minHeight: "100vh", background: "#080808", overflow: "hidden" }}>
      <Header />
      <TickerCards />

      {!data && !loading && (
        <div style={{ position: "relative", minHeight: "72vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          {/* bg rows */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-around", opacity: 0.35, pointerEvents: "none", padding: "16px 0" }}>
            <ScrollingRow items={row1} direction="left" />
            <ScrollingRow items={row2} direction="right" />
            <ScrollingRow items={row3} direction="left" />
          </div>

          {/* fade edges */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background: "linear-gradient(to right, #080808 4%, transparent 18%, transparent 82%, #080808 96%), linear-gradient(to bottom, #080808 0%, transparent 18%, transparent 82%, #080808 100%)"
          }} />

          {/* center */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px" }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#444", marginBottom: "20px" }}>
              REAL-TIME SENTIMENT ANALYSIS
            </div>
            <h1 style={{
  fontSize: "80px", fontWeight: "900", margin: "0 0 6px 0", lineHeight: 1,
  fontFamily: "'Courier New', monospace", letterSpacing: "2px", color: "#e0e0e0",
  display: "flex", alignItems: "center", justifyContent: "center", gap: "16px",
}}>
  PULSE<span style={{ color: "#00ff88" }}>STOCK</span>
  <div style={{ position: "relative", width: "30px", height: "30px", flexShrink: 0 }}>
    <motion.div
      animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "#00ff88",
      }}
    />
    <div style={{
      position: "absolute", inset: "3px", borderRadius: "50%",
      background: "#00ff88",
    }} />
  </div>
</h1>
            <div style={{ color: "#2a2a2a", fontSize: "12px", letterSpacing: "5px", marginBottom: "44px" }}>
              SENTIMENT TERMINAL
            </div>
            <SearchBar onResult={setData} onLoading={setLoading} />
          </motion.div>
        </div>
      )}

      {(data || loading) && (
        <div style={{ padding: "20px 0 0 0" }}>
          <SearchBar onResult={setData} onLoading={setLoading} />
        </div>
      )}

      {loading && (
        <div style={{ padding: "40px 32px", color: "#00ff88", fontFamily: "'Courier New', monospace", letterSpacing: "3px", fontSize: "12px" }}>
          ▶ SCANNING SENTIMENT DATA...
        </div>
      )}

      {data && !loading && (
        <>
          <SentimentPanel ticker={data.ticker} score={data.score} label={data.label} brief={data.brief} />
          <PostsList posts={data.posts} />
        </>
      )}
      <AgentChat />
    </main>
  );
}