import React from "react";

type Props = {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  discovered: boolean;
};

export default function MapNode({ id, name, radius, discovered }: Props) {
  const size = radius * 2;

  return (
    <a
      href={`/game/regions/${id}`}
      aria-label={`Enter ${name}`}
      title={discovered ? name : "Undiscovered"}
      style={{
        position: "relative",
        display: "block",
        width: size,
        height: size,
        borderRadius: "999px",
        cursor: "pointer",
        textDecoration: "none",
        background: discovered ? "rgba(122,91,43,0.08)" : "transparent",
        boxShadow: discovered ? "0 0 0 2px rgba(58,42,18,0.25), 0 0 18px rgba(58,42,18,0.18)" : "none"
      }}
    >
      {discovered ? (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translate(-50%, 10px)",
            whiteSpace: "nowrap",
            fontFamily: "serif",
            fontSize: 16,
            color: "rgba(42,28,11,0.9)",
            textShadow: "0 1px 0 rgba(242,230,201,0.9)"
          }}
        >
          {name}
        </span>
      ) : (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translate(-50%, 10px)",
            whiteSpace: "nowrap",
            fontFamily: "serif",
            fontSize: 14,
            color: "rgba(42,28,11,0.45)"
          }}
        >
          ???
        </span>
      )}
    </a>
  );
}
