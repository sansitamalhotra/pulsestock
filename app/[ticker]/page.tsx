"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../components/Header";
import TickerCards from "../components/TickerCards";
import SentimentPanel from "../components/SentimentPanel";
import PostsList from "../components/PostsList";
import AgentChat from "../components/AgentChat";
import SearchBar from "../components/SearchBar";
import Watchlist from "../components/WatchList";

const API = process.env.NEXT_PUBLIC_API_URL || "https://pulsestock-api.onrender.com";

interface SentimentData {
  ticker: string;
  score: number;
  label: string;
  brief: string;
  posts: { source: string; text: string; url: string }[];
}

export default function TickerPage() {
  const params = useParams();
  const ticker = (params.ticker as string).toUpperCase();
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState<SentimentData | null>(null);
  const [newLoading, setNewLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/sentiment/${ticker}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [ticker]);

  return (
    <main style={{ minHeight: "100vh", background: "#080808" }}>
      <Header />
      <TickerCards />
      <div style={{ padding: "20px 0 0 0" }}>
        <SearchBar onResult={setNewData} onLoading={setNewLoading} />
      </div>

      {loading && (
        <div style={{ padding: "40px 32px", color: "#00ff88", fontFamily: "'Courier New', monospace", letterSpacing: "3px", fontSize: "12px" }}>
          ▶ SCANNING {ticker} SENTIMENT DATA...
        </div>
      )}

      {/* show new search result if user searched */}
      {newData && !newLoading && (
        <>
          <SentimentPanel ticker={newData.ticker} score={newData.score} label={newData.label} brief={newData.brief} />
          <PostsList posts={newData.posts} />
        </>
      )}

      {/* show auto-loaded ticker data */}
      {!newData && data && !loading && (
        <>
          <SentimentPanel ticker={data.ticker} score={data.score} label={data.label} brief={data.brief} />
          <PostsList posts={data.posts} />
        </>
      )}

      {newLoading && (
        <div style={{ padding: "40px 32px", color: "#00ff88", fontFamily: "'Courier New', monospace", letterSpacing: "3px", fontSize: "12px" }}>
          ▶ SCANNING SENTIMENT DATA...
        </div>
      )}

      <AgentChat />
      <Watchlist />
    </main>
  );
}