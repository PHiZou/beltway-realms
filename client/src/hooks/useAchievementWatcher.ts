import { useEffect, useRef } from 'react'
import { achievements, getUnlockedAchievements } from '../data/achievements'
import { useGameState } from '../state/GameStateProvider'
import { useToast } from '../components/ToastProvider'

export function useAchievementWatcher() {
  const { state } = useGameState()
  const { push } = useToast()
  const prevEarnedRef = useRef<Set<string> | null>(null)

  useEffect(() => {
    const ctx = {
      completedQuestIds: state.completedQuestIds,
      unlockedCardIds: state.unlockedCardIds,
      discoveredRegionIds: state.discoveredRegionIds,
      xp: state.xp,
      spentInsightCardIds: state.spentInsightCardIds,
    }

    const earned = getUnlockedAchievements(ctx)
    const earnedIds = new Set(earned.map((a) => a.id))

    if (prevEarnedRef.current !== null) {
      for (const a of achievements) {
        if (earnedIds.has(a.id) && !prevEarnedRef.current.has(a.id)) {
          push({
            icon: a.icon,
            title: a.title,
            body: a.description,
            kind: 'achievement',
          })
        }
      }
    }

    prevEarnedRef.current = earnedIds
  }, [
    state.completedQuestIds,
    state.unlockedCardIds,
    state.discoveredRegionIds,
    state.xp,
    state.spentInsightCardIds,
    push,
  ])
}
