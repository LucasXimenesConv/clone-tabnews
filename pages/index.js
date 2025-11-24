import { useEffect, useState } from "react";

export default function Home() {
  const [hearts, setHearts] = useState([]);

  function spawnHearts() {
    const amount = 40; // chuva intensa
    const newHearts = [];

    for (let i = 0; i < amount; i++) {
      newHearts.push({
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 3 + 3,
      });
    }

    setHearts(prev => [...prev, ...newHearts]);

    // Remove depois da animação
    setTimeout(() => {
      setHearts(prev => prev.slice(amount));
    }, 4000);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Carol</h1>
      <p style={styles.text}>Volta logo, estou morrendo de saudades.</p>
      <p style={styles.text}>Meu amorrrr!</p>
      <p style={styles.text}>Queria estar com você agora.</p>

      <button style={styles.button} onClick={spawnHearts}>
        Fazer chover corações
      </button>

      {/* Corações só renderizam no cliente */}
      <div style={styles.heartsContainer}>
        {hearts.map(h => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              top: "-20px",
              left: `${h.left}%`,
              fontSize: h.size,
              animation: `fall ${h.duration}s linear`,
              pointerEvents: "none",
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: 80,
    position: "relative",
    overflow: "hidden",
    height: "100vh",
  },
  heartsContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
  },
  title: {
    fontSize: 40,
    color: "#ff4081",
  },
  text: {
    fontSize: 22,
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    padding: "10px 20px",
    fontSize: 18,
    cursor: "pointer",
    background: "#ff4081",
    color: "#fff",
    border: "none",
    borderRadius: 12,
  },
};
