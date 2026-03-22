"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div style={{
      padding: "20px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative", width: "10px", height: "10px" }}>
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#00ff88",
            }}
          />
          <div style={{
            position: "absolute", inset: "2px", borderRadius: "50%",
            background: "#00ff88",
          }} />
        </div>
        <span style={{ fontSize: "14px", fontWeight: "900", color: "#e0e0e0", letterSpacing: "4px" }}>
          PULSE<span style={{ color: "#00ff88" }}>STOCK</span>
        </span>
      </div>
      <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#333" }}>
        SENTIMENT TERMINAL
      </div>
    </div>
  );
}