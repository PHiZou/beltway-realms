import React from "react";

type Props = {
  name: string;
  lore: string;
  icon?: string;
  tags?: string[];
  neighbors?: { id: string; name: string }[];
  bossId?: string | null;
};

function CrestGlyph({ icon }: { icon?: string }) {
  const common: React.CSSProperties = { width: 46, height: 46, opacity: 0.85 };

  switch (icon) {
    case "dominion":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M10 44 L32 12 L54 44 Z" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M20 44 V54 H44 V44" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "citadel":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M14 52 V26 L22 18 L30 26 V52" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M34 52 V22 L42 14 L50 22 V52" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "archives":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M18 18 H46 V52 H18 Z" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M24 26 H40" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M24 34 H40" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "bastion":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M18 26 H46 V52 H18 Z" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M18 26 L24 18 H40 L46 26" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "spires":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M22 52 V18 H30 V52" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M34 52 V14 H42 V52" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <circle cx="20" cy="32" r="6" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <circle cx="44" cy="20" r="6" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <circle cx="44" cy="44" r="6" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M25 29 L39 23" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M25 35 L39 41" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "gate":
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <path d="M18 52 V22 C18 18 22 14 26 14 H38 C42 14 46 18 46 22 V52"
                fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M28 52 V30 H36 V52" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
    case "nexus":
    default:
      return (
        <svg viewBox="0 0 64 64" style={common} aria-hidden="true">
          <circle cx="32" cy="32" r="16" fill="none" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M32 16 V48" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
          <path d="M16 32 H48" stroke="rgba(42,28,11,0.9)" strokeWidth="4"/>
        </svg>
      );
  }
}

export default function RegionCrest({ name, lore, icon, tags, neighbors, bossId }: Props) {
  return (
    <section style={styles.card}>
      <div style={styles.top}>
        <div style={styles.badge}>
          <CrestGlyph icon={icon} />
        </div>
        <div>
          <div style={styles.title}>{name}</div>
          <div style={styles.lore}>{lore}</div>
        </div>
      </div>

      {tags?.length ? (
        <div style={styles.tags}>
          {tags.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>
      ) : null}

      <div style={styles.actions}>
        <a href="/game/map" style={styles.action}>Fast travel to Map</a>
        {bossId ? <a href={`/game/bosses/${bossId}`} style={styles.action}>Enter Boss Gate</a> : null}
      </div>

      {neighbors?.length ? (
        <div style={{ marginTop: 14 }}>
          <div style={styles.subhead}>Nearby Routes</div>
          <div style={styles.neighbors}>
            {neighbors.map((n) => (
              <a key={n.id} href={`/game/regions/${n.id}`} style={styles.neighbor}>
                {n.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 18,
    padding: 16,
    background: "rgba(242,230,201,0.65)"
  },
  top: { display: "flex", gap: 14, alignItems: "flex-start" },
  badge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(242,230,201,0.85)",
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto"
  },
  title: { fontFamily: "serif", fontSize: 26, fontWeight: 900, opacity: 0.9 },
  lore: { marginTop: 6, fontFamily: "serif", fontSize: 16, opacity: 0.82, lineHeight: 1.35 },
  tags: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 },
  tag: {
    fontFamily: "serif",
    border: "1px solid rgba(0,0,0,0.18)",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 14,
    opacity: 0.85
  },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 },
  action: {
    textDecoration: "none",
    fontFamily: "serif",
    border: "1px solid rgba(0,0,0,0.25)",
    borderRadius: 12,
    padding: "8px 12px",
    color: "rgba(0,0,0,0.78)",
    background: "rgba(242,230,201,0.6)"
  },
  subhead: { fontFamily: "serif", fontWeight: 800, opacity: 0.75, marginBottom: 8 },
  neighbors: { display: "flex", gap: 10, flexWrap: "wrap" },
  neighbor: {
    textDecoration: "none",
    fontFamily: "serif",
    padding: "6px 10px",
    borderRadius: 12,
    border: "1px dashed rgba(0,0,0,0.22)",
    color: "rgba(0,0,0,0.75)"
  }
};
