import React, { useEffect, useMemo, useRef, useState } from "react";
import mapData from "../../../data/map.nova-dc.json";
import { useGameState } from "../../../lib/gameState";
import MapNode from "./MapNode";

type Region = {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
};

type Viewport = { width: number; height: number };

export default function WorldMapCanvas() {
  const regions = (mapData as any).regions as Region[];
  const viewport = (mapData as any).viewport as Viewport;
  const fog = (mapData as any).fogOfWar as { enabled: boolean; defaultDiscovered: string[] };

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [renderSize, setRenderSize] = useState<{ w: number; h: number }>({ w: viewport.width, h: viewport.height });

  const discoveredRegions = useGameState((s) => s.discoveredRegions);
  const discoverRegion = useGameState((s) => s.discoverRegion);
  const load = useGameState((s) => s.load);

  useEffect(() => {
    const measure = () => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setRenderSize({ w: rect.width, h: rect.height });
    };

    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && imgRef.current) {
      ro = new ResizeObserver(() => measure());
      ro.observe(imgRef.current);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (ro && imgRef.current) ro.unobserve(imgRef.current);
      window.removeEventListener("resize", measure);
    };
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    load();

    const hasAny = Object.keys(discoveredRegions || {}).length > 0;
    if (!hasAny && fog?.enabled && Array.isArray(fog.defaultDiscovered)) {
      fog.defaultDiscovered.forEach((id: string) => discoverRegion(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scale = useMemo(() => {
    const sx = renderSize.w / viewport.width;
    const sy = renderSize.h / viewport.height;
    return { sx, sy, avg: (sx + sy) / 2 };
  }, [renderSize, viewport.width, viewport.height]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <img
        ref={imgRef}
        src="/img/maps/beltway-realms.svg"
        alt="The Beltway Realms map"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: renderSize.w,
          height: renderSize.h,
          pointerEvents: "none"
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "none" }}>
          {regions.map((r) => {
            const discovered = !!discoveredRegions?.[r.id];
            const x = r.x * scale.sx;
            const y = r.y * scale.sy;
            const clickRadius = Math.max(22, r.radius * 0.42 * scale.avg);

            return (
              <div
                key={r.id}
                style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}
              >
                <div style={{ pointerEvents: "auto" }}>
                  <MapNode id={r.id} name={r.name} x={0} y={0} radius={clickRadius} discovered={discovered} />
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 14,
            padding: "10px 12px",
            border: "1px solid rgba(0,0,0,0.18)",
            borderRadius: 12,
            background: "rgba(242,230,201,0.85)",
            maxWidth: 520,
            pointerEvents: "auto"
          }}
        >
          <div style={{ fontFamily: "serif", fontWeight: 800, opacity: 0.85 }}>Choose a region to enter its zone</div>
          <div style={{ fontFamily: "serif", opacity: 0.7 }}>Undiscovered areas show “???” until explored.</div>
        </div>
      </div>
    </div>
  );
}
