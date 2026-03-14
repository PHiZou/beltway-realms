import { create } from "zustand";

type SavePayload = {
  xp: number;
  discoveredRegions: Record<string, true>;
  completedQuests: Record<string, true>;
};

type GameState = {
  xp: number;
  discoveredRegions: Record<string, true>;
  completedQuests: Record<string, true>;

  discoverRegion: (id: string) => void;

  completeQuest: (questId: string, xpAward?: number) => void;
  isQuestComplete: (questId: string) => boolean;

  load: () => void;
  persist: () => void;
  reset: () => void;
};

const STORAGE_KEY = "beltway_realms_save_v1";

function safeParse(json: string | null): any | null {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const useGameState = create<GameState>((set, get) => ({
  xp: 0,
  discoveredRegions: {},
  completedQuests: {},

  persist: () => {
    const payload: SavePayload = {
      xp: get().xp,
      discoveredRegions: get().discoveredRegions,
      completedQuests: get().completedQuests
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  },

  discoverRegion: (id: string) => {
    if (!id) return;
    const { discoveredRegions } = get();
    if (discoveredRegions[id]) return;

    set({ discoveredRegions: { ...discoveredRegions, [id]: true } });
    get().persist();
  },

  completeQuest: (questId: string, xpAward = 25) => {
    if (!questId) return;

    const { completedQuests, xp } = get();
    if (completedQuests[questId]) return;

    set({
      completedQuests: { ...completedQuests, [questId]: true },
      xp: xp + xpAward
    });
    get().persist();
  },

  isQuestComplete: (questId: string) => {
    if (!questId) return false;
    return !!get().completedQuests?.[questId];
  },

  load: () => {
    const data = safeParse(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);
    if (!data) return;

    set({
      xp: typeof data.xp === "number" ? data.xp : 0,
      discoveredRegions:
        typeof data.discoveredRegions === "object" && data.discoveredRegions ? data.discoveredRegions : {},
      completedQuests:
        typeof data.completedQuests === "object" && data.completedQuests ? data.completedQuests : {}
    });
  },

  reset: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    set({ xp: 0, discoveredRegions: {}, completedQuests: {} });
  }
}));
