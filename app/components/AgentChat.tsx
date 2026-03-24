"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const API = process.env.NEXT_PUBLIC_API_URL || "https://pulsestock-api.onrender.com";

interface Message {
  role: "user" | "agent";
  content: string;
}

export default function AgentChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: "PulseStock AI online. Ask me anything about market sentiment, prices, or comparisons." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
     const res = await fetch(`${API}/agent?q=${encodeURIComponent(userMsg)}&session_id=${sessionId}`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: "agent", content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: "agent", content: "Error connecting to agent. Try again." }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 100,
          background: "#00ff88", border: "none", borderRadius: "50px",
          padding: "12px 20px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "8px",
          fontFamily: "'Courier New', monospace", fontWeight: "800",
          fontSize: "12px", letterSpacing: "2px", color: "#080808",
          boxShadow: "0 0 20px rgba(0,255,136,0.3)",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#080808" }}
        />
        {open ? "CLOSE" : "AI ANALYST"}
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", bottom: "80px", right: "24px", zIndex: 99,
              width: "420px", height: "520px",
              background: "#0a0a0a", border: "1px solid #1a1a1a",
              borderRadius: "16px", display: "flex", flexDirection: "column",
              overflow: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.8)",
            }}
          >
            {/* header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid #111",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88" }}
              />
              <span style={{ color: "#e0e0e0", fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "2px", fontWeight: "800" }}>
                PULSESTOCK <span style={{ color: "#00ff88" }}>AI</span>
              </span>
              <span style={{ color: "#333", fontSize: "10px", fontFamily: "'Courier New', monospace", marginLeft: "auto" }}>
                GPT-4o-mini
              </span>
            </div>

            {/* messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div style={{
                    maxWidth: "85%",
                    background: msg.role === "user" ? "#00ff88" : "#111",
                    color: msg.role === "user" ? "#080808" : "#ccc",
                    padding: "10px 14px", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    fontSize: "12px", lineHeight: "1.7",
                    fontFamily: "'Courier New', monospace",
                    whiteSpace: "pre-wrap",
                  }}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", gap: "4px", padding: "8px 0" }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88" }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #111", display: "flex", gap: "8px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask about any ticker..."
                style={{
                  flex: 1, background: "#111", border: "1px solid #222",
                  borderRadius: "8px", padding: "10px 14px",
                  color: "#e0e0e0", fontSize: "12px", outline: "none",
                  fontFamily: "'Courier New', monospace",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                  background: loading ? "#1a1a1a" : "#00ff88",
                  border: "none", borderRadius: "8px",
                  padding: "10px 16px", cursor: loading ? "not-allowed" : "pointer",
                  color: "#080808", fontWeight: "800", fontSize: "12px",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                ▶
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}