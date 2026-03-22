export default function Header() {
  return (
    <header style={{
      borderBottom: "1px solid #1a1a1a",
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#00ff88",
        }} />
        <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "4px" }}>
          PULSE<span style={{ color: "#00ff88" }}>STOCK</span>
        </span>
      </div>
      <span style={{ color: "#333", fontSize: "11px", letterSpacing: "2px" }}>
        SENTIMENT TERMINAL
      </span>
    </header>
  );
}