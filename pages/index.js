import { useState } from "react";

export default function Home() {
  const [explosions, setExplosions] = useState([]);

  function explodeHearts() {
    const id = Date.now();
    setExplosions([...explosions, id]);

    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e !== id));
    }, 2000);
  }

  return (
    <div style={styles.container}>
      <FloatingHearts />
      {explosions.map((id) => (
        <Explosion key={id} />
      ))}

      <h1 style={styles.title}>Carol ❤️</h1>

      <p style={styles.text}>Volta logo, estou morrendo de saudades.</p>
      <p style={styles.text}>Meu amorrrr!</p>
      <p style={styles.text}>Queria estar com você agora.</p>

      <button style={styles.button} onClick={explodeHearts}>
        Clique aqui 💖
      </button>

      <style>{css}</style>
    </div>
  );
}

/* Corações flutuando de leve no fundo */
function FloatingHearts() {
  const hearts = Array.from({ length: 25 });

  return (
    <div style={styles.heartsContainer}>
      {hearts.map((_, i) => (
        <span
          key={i}
          style={{
            ...styles.heart,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

/* CHUVA DE CORAÇÕES AO CLICAR */
function Explosion() {
  const burst = Array.from({ length: 150 }); // ← AQUI: mais corações

  return (
    <div style={styles.explosion}>
      {burst.map((_, i) => {
        const angle = Math.random() * 360;
        const distance = Math.random() * 300 + 80;
        const size = Math.random() * 22 + 18;
        const emoji = Math.random() > 0.5 ? "💖" : "❤️";

        return (
          <span
            key={i}
            className="burst-heart"
            style={{
              transform: `translate(-50%, -50%)`,
              fontSize: `${size}px`,
              animationDelay: `${Math.random() * 0.2}s`,
              "--x": `${Math.cos(angle) * distance}px`,
              "--y": `${Math.sin(angle) * distance}px`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

const css = `
@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-40px) scale(1.4); opacity: 0.8; }
  100% { transform: translateY(-90px) scale(1); opacity: 0; }
}

@keyframes glow {
  0% { text-shadow: 0 0 10px #fff, 0 0 30px #ff99c8; }
  50% { text-shadow: 0 0 20px #ff66b3, 0 0 40px #ff1493; }
  100% { text-shadow: 0 0 10px #fff, 0 0 30px #ff99c8; }
}

@keyframes burst {
  0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) scale(1.3); opacity: 0; }
}
`;

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background:
      "linear-gradient(135deg, #ff9ecb, #ff6fa2, #ff85b3, #ff6fa2, #ff9ecb)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 10s ease infinite",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "50px",
    color: "white",
    fontWeight: "900",
    marginBottom: "15px",
    animation: "glow 2s infinite ease-in-out",
  },
  text: {
    color: "white",
    fontSize: "22px",
    margin: "4px 0",
  },
  button: {
    marginTop: "25px",
    padding: "14px 26px",
    background: "#ffffffbb",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "0.2s",
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
    top: "100%",
    fontSize: "26px",
    animation: "float 5s infinite ease-in-out",
  },
  explosion: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 0,
    height: 0,
    pointerEvents: "none",
  },
};
