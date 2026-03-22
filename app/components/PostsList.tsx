interface Post {
  source: string;
  text: string;
  url: string;
}

interface Props {
  posts: Post[];
}

export default function PostsList({ posts }: Props) {
  return (
    <div style={{
      margin: "20px 32px 32px 32px",
      background: "#111",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      padding: "24px",
    }}>
      <div style={{ color: "#333", fontSize: "10px", letterSpacing: "3px", marginBottom: "16px" }}>
        TOP HEADLINES // DRIVING SENTIMENT
      </div>

      {posts.map((post, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: "12px",
          padding: "14px 0",
          borderBottom: i < posts.length - 1 ? "1px solid #1a1a1a" : "none",
        }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%", marginTop: "5px", flexShrink: 0,
            background: "#00ff88",
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#333", fontSize: "10px", marginBottom: "4px" }}>{post.source}</div>
            <a href={post.url} target="_blank" rel="noreferrer" style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.5", textDecoration: "none" }}>
              {post.text}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}