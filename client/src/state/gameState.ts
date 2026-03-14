import { GAME_CONFIG } from '../config/game'
import type { DiceOutcomeTier } from '../rules/dice'

export type QuestOutcome = {
  tier: DiceOutcomeTier
  narrative: string
  xpEarned: number
  roll: number
  modifier: number
  timestamp: number
}

export type GameState = {
  currentRegionId: string | null
  activeQuestId: string | null
  lastRoll: number | null
  discoveredRegionIds: string[]
  xp: number
  unlockedCardIds: string[]
  completedQuestIds: string[]
  spentInsightCardIds: string[]
  pendingRollModifier: number
  questOutcomes: Record<string, QuestOutcome>
}

export const STORAGE_KEY = 'beltway-realms-state-v1'

export const defaultState: GameState = {
  currentRegionId: GAME_CONFIG.startingRegionId,
  activeQuestId: null,
  lastRoll: null,
  discoveredRegionIds: [...GAME_CONFIG.startingDiscoveredRegionIds],
  xp: 0,
  unlockedCardIds: [GAME_CONFIG.defaultUnlockedSkillId],
  completedQuestIds: [],
  spentInsightCardIds: [],
  pendingRollModifier: 0,
  questOutcomes: {},
}

export function loadInitialState(): GameState {
  if (typeof window === 'undefined') return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<GameState>
    return {
      currentRegionId: parsed.currentRegionId ?? null,
      activeQuestId: parsed.activeQuestId ?? null,
      lastRoll: parsed.lastRoll ?? null,
      discoveredRegionIds: parsed.discoveredRegionIds ?? [],
      xp: parsed.xp ?? defaultState.xp,
      unlockedCardIds: parsed.unlockedCardIds ?? defaultState.unlockedCardIds,
      completedQuestIds: parsed.completedQuestIds ?? defaultState.completedQuestIds,
      spentInsightCardIds: parsed.spentInsightCardIds ?? defaultState.spentInsightCardIds,
      pendingRollModifier: parsed.pendingRollModifier ?? defaultState.pendingRollModifier,
      questOutcomes: parsed.questOutcomes ?? defaultState.questOutcomes,
    }
  } catch {
    return defaultState
  }
}
