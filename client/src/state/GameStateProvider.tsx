import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultState, loadInitialState, STORAGE_KEY, type GameState, type QuestOutcome } from './gameState'

type GameStateContextValue = {
  state: GameState
  setCurrentRegion: (regionId: string | null) => void
  setActiveQuest: (questId: string | null) => void
  setLastRoll: (roll: number | null) => void
  markRegionDiscovered: (regionId: string) => void
  addXp: (amount: number) => void
  unlockCard: (cardId: string) => void
  markQuestCompleted: (questId: string) => void
  spendInsightCard: (cardId: string) => void
  setPendingRollModifier: (amount: number) => void
  recordQuestOutcome: (questId: string, outcome: QuestOutcome) => void
  reset: () => void
}

const GameStateContext = createContext<GameStateContextValue | undefined>(undefined)

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => loadInitialState())

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setCurrentRegion = useCallback(
    (currentRegionId: string | null) => setState((prev) => ({ ...prev, currentRegionId })),
    [],
  )

  const setActiveQuest = useCallback(
    (activeQuestId: string | null) => setState((prev) => ({ ...prev, activeQuestId })),
    [],
  )

  const setLastRoll = useCallback(
    (lastRoll: number | null) => setState((prev) => ({ ...prev, lastRoll })),
    [],
  )

  const markRegionDiscovered = useCallback(
    (regionId: string) =>
      setState((prev) => {
        if (prev.discoveredRegionIds.includes(regionId)) return prev
        return { ...prev, discoveredRegionIds: [...prev.discoveredRegionIds, regionId] }
      }),
    [],
  )

  const addXp = useCallback(
    (amount: number) => setState((prev) => ({ ...prev, xp: Math.max(0, prev.xp + amount) })),
    [],
  )

  const unlockCard = useCallback(
    (cardId: string) =>
      setState((prev) => {
        if (prev.unlockedCardIds.includes(cardId)) return prev
        return { ...prev, unlockedCardIds: [...prev.unlockedCardIds, cardId] }
      }),
    [],
  )

  const markQuestCompleted = useCallback(
    (questId: string) =>
      setState((prev) => {
        if (prev.completedQuestIds.includes(questId)) return prev
        return { ...prev, completedQuestIds: [...prev.completedQuestIds, questId] }
      }),
    [],
  )

  const spendInsightCard = useCallback(
    (cardId: string) =>
      setState((prev) => ({
        ...prev,
        spentInsightCardIds: prev.spentInsightCardIds.includes(cardId)
          ? prev.spentInsightCardIds
          : [...prev.spentInsightCardIds, cardId],
      })),
    [],
  )

  const setPendingRollModifier = useCallback(
    (amount: number) => setState((prev) => ({ ...prev, pendingRollModifier: amount })),
    [],
  )

  const recordQuestOutcome = useCallback(
    (questId: string, outcome: QuestOutcome) =>
      setState((prev) => ({
        ...prev,
        questOutcomes: { ...prev.questOutcomes, [questId]: outcome },
      })),
    [],
  )

  const reset = useCallback(() => setState(defaultState), [])

  const value = useMemo<GameStateContextValue>(
    () => ({
      state,
      setCurrentRegion,
      setActiveQuest,
      setLastRoll,
      markRegionDiscovered,
      addXp,
      unlockCard,
      markQuestCompleted,
      spendInsightCard,
      setPendingRollModifier,
      recordQuestOutcome,
      reset,
    }),
    [
      state,
      setCurrentRegion,
      setActiveQuest,
      setLastRoll,
      markRegionDiscovered,
      addXp,
      unlockCard,
      markQuestCompleted,
      spendInsightCard,
      setPendingRollModifier,
      recordQuestOutcome,
      reset,
    ],
  )

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>
}

export function useGameState() {
  const ctx = useContext(GameStateContext)
  if (!ctx) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return ctx
}
