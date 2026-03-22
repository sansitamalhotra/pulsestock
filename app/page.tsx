"use client";
import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TickerCards from "./components/TickerCards";
import SentimentPanel from "./components/SentimentPanel";
import PostsList from "./components/PostsList";

interface SentimentData {
  ticker: string;
  score: number;
  label: string;
  brief: string;
  posts: { source: string; text: string; url: string }[];
}

export default function Home() {
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <Header />
      <SearchBar onResult={setData} onLoading={setLoading} />
      <TickerCards />
      {loading && (
        <div style={{ padding: "40px 32px", color: "#2a6a2a", fontFamily: "'Courier New', monospace", letterSpacing: "3px" }}>
          SCANNING SENTIMENT DATA...
        </div>
      )}
      {data && !loading && (
        <>
          <SentimentPanel
            ticker={data.ticker}
            score={data.score}
            label={data.label}
            brief={data.brief}
          />
          <PostsList posts={data.posts} />
        </>
      )}
    </main>
  );
}