export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.heartsContainer}>
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ ...styles.heart, animationDelay: `${i * 0.3}s` }}>
            ❤️
          </span>
        ))}
      </div>

      <h1 style={styles.title}>Carolina</h1>
      <p style={styles.text}>Eu estou com saudades de você.</p>
      <p style={styles.text}>Pensei em você o dia inteiro.</p>
      <p style={styles.text}>Queria estar perto agora.</p>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.3); opacity: 0.7; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }
        @keyframes glow {
          0% { text-shadow: 0 0 8px rgba(255, 100, 150, 0.5); }
          50% { text-shadow: 0 0 16px rgba(255, 100, 150, 0.9); }
          100% { text-shadow: 0 0 8px rgba(255, 100, 150, 0.5); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #ffb3c6, #ff6f91, #ff8fab)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Arial', sans-serif"
  },
  title: {
    fontSize: "48px",
    color: "white",
    fontWeight: "bold",
    animation: "glow 2s infinite ease-in-out",
    marginBottom: "10px",
  },
  text: {
    color: "white",
    fontSize: "22px",
    textAlign: "center",
    margin: "5px 0",
  },
  heartsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  },
  heart: {
    position: "absolute",
    fontSize: "24px",
    color: "white",
    animation: "float 4s infinite ease-in-out",
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }
};
