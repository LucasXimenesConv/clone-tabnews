import { useState } from "react";

export default function Home() {
  const [explosions, setExplosions] = useState([]);

  function explodeHearts() {
    const id = Date.now();
    setExplosions((prev) => [...prev, id]);

    // remove depois de 2200ms (tempo da animação)
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e !== id));
    }, 2200);
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

/* corações leves de fundo */
function FloatingHearts() {
  const hearts = Array.from({ length: 20 });
  return (
    <div style={styles.heartsContainer}>
      {hearts.map((_, i) => (
        <span
          key={i}
          style={{
            ...styles.heart,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.35}s`,
            fontSize: `${14 + Math.random() * 18}px`,
            opacity: 0.9 - Math.random() * 0.4,
          }}
        >
          {Math.random() > 0.5 ? "💖" : "❤️"}
        </span>
      ))}
    </div>
  );
}

/* CHUVA GIGANTE: explode muitos corações a partir do centro, em todas as direções */
function Explosion() {
  const count = 140; // quantos corações por clique
  const burst = Array.from({ length: count });

  return (
    <div style={styles.explosion}>
      {burst.map((_, i) => {
        // ângulo em graus -> converter para radianos
        const angleDeg = Math.random() * 360;
        const angleRad = (angleDeg * Math.PI) / 180;
        const distance = 80 + Math.random() * 520; // quanto mais, mais espalhados
        const size = 14 + Math.random() * 26;
        const duration = 0.9 + Math.random() * 1.4;
        const rot = -360 + Math.random() * 720; // rotação
        const emoji = Math.random() > 0.5 ? "💖" : "❤️";

        // deslocamentos finais em px
        const dx = Math.cos(angleRad) * distance;
        const dy = Math.sin(angleRad) * distance;

        return (
          <span
            key={i}
            className="burst-heart"
            style={{
              left: "50%",
              top: "50%",
              position: "absolute",
              fontSize: `${size}px`,
              // CSS variables para a animação usar
              // usamos calc(-50% + var(--x)) na keyframe final
              // OBS: variáveis precisam ser strings como "123px"
              ["--x"]: `${dx}px`,
              ["--y"]: `${dy}px`,
              ["--rot"]: `${rot}deg`,
              animationDuration: `${duration}s`,
              animationDelay: `${Math.random() * 0.06}s`,
              pointerEvents: "none",
              transform: "translate(-50%,-50%)",
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
/* fundo gradient animado */
@keyframes gradientShift {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

/* floating hearts (background) */
@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-40px) scale(1.3); opacity: 0.8; }
  100% { transform: translateY(-90px) scale(1); opacity: 0; }
}

/* burst: do centro para posição calculada com var(--x/--y) */
@keyframes burst {
  0% {
    transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    /* move do centro para a posição final adicionando o deslocamento var(--x/--y) */
    transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.05) rotate(var(--rot));
    opacity: 0;
  }
}

/* burst-heart usa a animação burst; duração e delay definidos inline */
.burst-heart {
  animation-name: burst;
  animation-timing-function: cubic-bezier(.12,.9,.32,1);
  will-change: transform, opacity;
}

/* styling extra */
@keyframes glow {
  0% { text-shadow: 0 0 8px #fff, 0 0 26px #ff9ecb; }
  50% { text-shadow: 0 0 18px #ff66b3, 0 0 40px #ff1493; }
  100% { text-shadow: 0 0 8px #fff, 0 0 26px #ff9ecb; }
}
`;

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background:
      "linear-gradient(135deg, #ff9ecb, #ff6fa2, #ff85b3, #ff6fa2, #ff9ecb)",
    backgroundSize: "300% 300%",
    animation: "gradientShift 10s ease infinite",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, system-ui, -apple-system, 'Segoe UI', Roboto",
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
    fontSize: "24px",
    animation: "float 5.5s infinite ease-in-out",
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
