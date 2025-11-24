import { useEffect, useState } from "react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [explosions, setExplosions] = useState([]);

  // marca que estamos no client (evita mismatch)
  useEffect(() => {
    setHydrated(true);
  }, []);

  function explodeHearts() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setExplosions((prev) => [...prev, id]);

    // remove depois da animação
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e !== id));
    }, 2200);
  }

  // Enquanto não hidratou, renderizamos uma versão mínima para evitar mismatch
  if (!hydrated) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Carol ❤️</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* fundo e elementos decorativos */}
      <FloatingHearts />

      {/* overlay onde as explosões aparecem */}
      <div style={styles.explosionLayer} aria-hidden="true">
        {explosions.map((id) => (
          <Explosion key={id} />
        ))}
      </div>

      {/* conteúdo principal */}
      <div style={styles.content}>
        <h1 style={styles.title}>Carol ❤️</h1>

        <p style={styles.text}>Volta logo, estou morrendo de saudades.</p>
        <p style={styles.text}>Meu amorrrr!</p>
        <p style={styles.text}>Queria estar com você agora.</p>

        <button style={styles.button} onClick={explodeHearts}>
          Clique aqui 💖
        </button>
      </div>

      {/* css local */}
      <style>{css}</style>
    </div>
  );
}

/* corações leves de fundo (gerados só no client) */
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: 14 + Math.random() * 18,
      opacity: 0.6 + Math.random() * 0.4,
      emoji: Math.random() > 0.5 ? "💖" : "❤️",
    }));
    setHearts(arr);
  }, []);

  return (
    <div style={styles.heartsContainer} aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={i}
          style={{
            ...styles.heart,
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* Explosão: cada montagem cria um burst (gerado no client) */
function Explosion() {
  const [burst, setBurst] = useState([]);

  useEffect(() => {
    const count = 140; // aumente/decrease se quiser mais/menos corações por clique
    const arr = Array.from({ length: count }).map(() => {
      const angle = Math.random() * 2 * Math.PI; // radianos direto
      const distance = 80 + Math.random() * 520;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      return {
        dx,
        dy,
        size: 14 + Math.random() * 26,
        duration: 0.9 + Math.random() * 1.4,
        delay: Math.random() * 0.06,
        rot: -360 + Math.random() * 720,
        emoji: Math.random() > 0.5 ? "💖" : "❤️",
      };
    });
    setBurst(arr);
  }, []);

  return (
    <div style={styles.explosion}>
      {burst.map((h, i) => (
        <span
          key={i}
          className="burst-heart"
          style={{
            left: "50%",
            top: "50%",
            position: "absolute",
            fontSize: `${h.size}px`,
            transform: "translate(-50%, -50%)",
            ["--x"]: `${h.dx}px`,
            ["--y"]: `${h.dy}px`,
            ["--rot"]: `${h.rot}deg`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            pointerEvents: "none",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* --- CSS e estilos --- */
const css = `
@keyframes gradientShift {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-40px) scale(1.3); opacity: 0.8; }
  100% { transform: translateY(-90px) scale(1); opacity: 0; }
}

@keyframes burst {
  0% {
    transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.05) rotate(var(--rot));
    opacity: 0;
  }
}

.burst-heart {
  animation-name: burst;
  animation-timing-function: cubic-bezier(.12,.9,.32,1);
  will-change: transform, opacity;
}

/* small polish so button press feels nice */
button:active { transform: translateY(2px); }

/* glow for title */
@keyframes glow {
  0% { text-shadow: 0 0 8px #fff, 0 0 26px #ff9ecb; }
  50% { text-shadow: 0 0 18px #ff66b3, 0 0 40px #ff1493; }
  100% { text-shadow: 0 0 8px #fff, 0 0 26px #ff9ecb; }
}
`;

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #ff9ecb, #ff6fa2, #ff85b3, #ff6fa2, #ff9ecb)",
    backgroundSize: "300% 300%",
    animation: "gradientShift 10s ease infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    textAlign: "center",
    padding: "40px 20px",
    fontFamily: "Arial, system-ui, -apple-system, 'Segoe UI', Roboto",
    position: "relative",
  },
  content: {
    maxWidth: 900,
    zIndex: 3, // garante que o conteúdo fique acima de corações de fundo
  },
  title: {
    fontSize: "48px",
    color: "white",
    fontWeight: 900,
    marginBottom: "12px",
    animation: "glow 2.2s infinite ease-in-out",
  },
  text: {
    color: "white",
    fontSize: "20px",
    margin: "6px 0",
  },
  button: {
    marginTop: "22px",
    padding: "12px 26px",
    background: "#ffffffee",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 700,
    transition: "transform .12s ease",
    zIndex: 4,
  },
  heartsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 1,
  },
  heart: {
    position: "absolute",
    top: "100%",
    fontSize: "24px",
    animation: "float 5.5s infinite ease-in-out",
  },
  explosionLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 5,
    overflow: "visible",
  },
  explosion: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "visible",
  },
};
