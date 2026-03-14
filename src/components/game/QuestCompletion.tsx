import React, { useEffect, useMemo, useState } from "react";
import { useGameState } from "../../lib/gameState";

export default function QuestCompletion({
  questId,
  xpAward = 25
}: {
  questId: string;
  xpAward?: number;
}) {
  const load = useGameState((s) => s.load);
  const isQuestComplete = useGameState((s) => s.isQuestComplete);
  const completeQuest = useGameState((s) => s.completeQuest);
  const xp = useGameState((s) => s.xp);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    load();
    setMounted(true);
  }, [load]);

  const complete = useMemo(
    () => (mounted ? isQuestComplete(questId) : false),
    [mounted, isQuestComplete, questId]
  );

  return (
    <div style={styles.wrap}>
      <div style={styles.statusRow}>
        <span style={{ ...styles.status, ...(complete ? styles.complete : styles.incomplete) }}>
          {complete ? "Completed" : "Incomplete"}
        </span>
        <span style={styles.xp}>Total XP: {xp}</span>
      </div>

      <button
        onClick={() => completeQuest(questId, xpAward)}
        disabled={complete}
        style={{ ...styles.btn, ...(complete ? styles.btnDisabled : null) }}
        title={complete ? "Quest already completed" : `Complete quest (+${xpAward} XP)`}
      >
        {complete ? "Quest Completed" : `Mark Complete (+${xpAward} XP)`}
      </button>

      <div style={styles.hint}>
        Completing a quest is local to this device (saved in your browser).
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { display: "grid", gap: 10 },
  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap"
  },
  status: {
    fontFamily: "serif",
    borderRadius: 999,
    padding: "6px 12px",
    border: "1px solid rgba(0,0,0,0.22)",
    fontWeight: 900,
    opacity: 0.85
  },
  complete: { background: "rgba(122,91,43,0.12)" },
  incomplete: { background: "rgba(242,230,201,0.7)" },
  xp: { fontFamily: "serif", fontWeight: 800, opacity: 0.7 },
  btn: {
    fontFamily: "serif",
    borderRadius: 14,
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.25)",
    background: "rgba(242,230,201,0.7)",
    cursor: "pointer",
    fontWeight: 900
  },
  btnDisabled: { cursor: "default", opacity: 0.65 },
  hint: { fontFamily: "serif", opacity: 0.7, fontSize: 14 }
};
