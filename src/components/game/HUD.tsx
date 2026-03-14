import React, { useEffect } from "react";
import { useGameState } from "../../lib/gameState";

export default function HUD() {
  const xp = useGameState((s) => s.xp);
  const load = useGameState((s) => s.load);
  const reset = useGameState((s) => s.reset);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <a href="/game/map" style={styles.brand}>The Beltway Realms</a>
        <span style={styles.sep}>|</span>
        <a href="/game/sheet" style={styles.link}>Character</a>
        <a href="/game/skills" style={styles.link}>Skills</a>
        <a href="/" style={styles.link}>Exit</a>
      </div>

      <div style={styles.right}>
        <span style={styles.xp}>XP: {xp}</span>
        <button style={styles.btn} onClick={reset} title="Reset save">
          Reset
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "12px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(242,230,201,0.9)",
    backdropFilter: "blur(6px)"
  },
  left: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  right: { display: "flex", alignItems: "center", gap: 12 },
  brand: { fontWeight: 800, textDecoration: "none", color: "rgba(0,0,0,0.85)" },
  link: { textDecoration: "none", color: "rgba(0,0,0,0.75)" },
  sep: { opacity: 0.4 },
  xp: { fontWeight: 700, opacity: 0.75 },
  btn: {
    border: "1px solid rgba(0,0,0,0.25)",
    background: "transparent",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer"
  }
};
