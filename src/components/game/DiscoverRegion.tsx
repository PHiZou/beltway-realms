import React, { useEffect } from "react";
import { useGameState } from "../../lib/gameState";

export default function DiscoverRegion({ id }: { id: string }) {
  const load = useGameState((s) => s.load);
  const discoverRegion = useGameState((s) => s.discoverRegion);

  useEffect(() => {
    load();
    discoverRegion(id);
  }, [id, load, discoverRegion]);

  return null;
}
