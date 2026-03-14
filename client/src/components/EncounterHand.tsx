import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Quest, Card, RegionId } from '../types'
import { cards, getDefaultHandForEncounter, getSkillBonusForUnlocked } from '../data/cards'
import { getNarrative } from '../data/narratives'
import { getRegionById } from '../data/regions'
import { quests } from '../data/quests'
import { CardView } from './CardView'
import { useGameState } from '../state/GameStateProvider'
import { useToast } from './ToastProvider'
import { resolveQuestRoll, getTier, type DiceResolution } from '../rules/dice'

type EncounterHandProps = {
  quest: Quest
}

type PlayedCard = {
  card: Card
  effect: string
  modifier: number
}

export function EncounterHand({ quest }: EncounterHandProps) {
  const {
    state: { currentRegionId, unlockedCardIds, completedQuestIds, spentInsightCardIds, pendingRollModifier },
    addXp,
    unlockCard,
    markQuestCompleted,
    spendInsightCard,
    setPendingRollModifier,
    setLastRoll,
    recordQuestOutcome,
  } = useGameState()

  const { push: pushToast } = useToast()
  const alreadyCompleted = completedQuestIds.includes(quest.id)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [diceResolution, setDiceResolution] = useState<DiceResolution | null>(null)
  const [questResolved, setQuestResolved] = useState(alreadyCompleted)
  const [newUnlocks, setNewUnlocks] = useState<string[]>([])
  const [earnedXp, setEarnedXp] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const [showedGuidance, setShowedGuidance] = useState(false)

  const [playedCards, setPlayedCards] = useState<PlayedCard[]>([])
  const [focusedSkillId, setFocusedSkillId] = useState<string | null>(null)
  const [dialoguePlayed, setDialoguePlayed] = useState(false)

  const region = currentRegionId ? getRegionById(currentRegionId) : null

  const nextQuest = useMemo(() => {
    if (!region) return null
    const idx = region.questIds.indexOf(quest.id)
    if (idx < 0 || idx >= region.questIds.length - 1) return null
    const nextId = region.questIds[idx + 1]
    return quests.find((q) => q.id === nextId) ?? null
  }, [region, quest.id])

  const availableInsightIds = useMemo(
    () =>
      unlockedCardIds.filter(
        (id) => id.startsWith('card-insight-') && !spentInsightCardIds.includes(id),
      ),
    [unlockedCardIds, spentInsightCardIds],
  )

  const hand = useMemo(() => {
    if (!currentRegionId) return []
    return getDefaultHandForEncounter(
      quest.id,
      currentRegionId as RegionId,
      unlockedCardIds,
      availableInsightIds,
    )
  }, [quest.id, currentRegionId, unlockedCardIds, availableInsightIds])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCardClick = (card: Card) => {
    setActiveCard(card)
  }

  const passiveSkillBonus = getSkillBonusForUnlocked(unlockedCardIds)
  const focusBonus = focusedSkillId ? 1 : 0
  const dialogueModifier = pendingRollModifier ?? 0
  const totalModifier = passiveSkillBonus + focusBonus + dialogueModifier

  const handleUseQuestCard = () => {
    if (!activeCard || activeCard.kind !== 'quest' || !currentRegionId || questResolved || isRolling)
      return

    const capturedCard = activeCard
    setIsRolling(true)
    setActiveCard(null)

    setTimeout(() => {
      const baseRoll = 1 + Math.floor(Math.random() * 20)
      const modifierTotal = totalModifier

      const tier = getTier(baseRoll + modifierTotal)
      const narrative = getNarrative(quest.id, tier)
      const resolution = resolveQuestRoll(baseRoll, modifierTotal, narrative)
      setDiceResolution(resolution)
      setLastRoll(resolution.finalTotal)
      setPendingRollModifier(0)

      const baseReward = capturedCard.xpReward ?? 0
      const totalXp = baseReward + resolution.xpBonus
      setEarnedXp(totalXp)
      if (totalXp > 0) {
        addXp(totalXp)
      }

      if (capturedCard.questId) {
        markQuestCompleted(capturedCard.questId)
      }

      const newUnlockIds: string[] = []
      if (capturedCard.unlocksCardIds) {
        for (const id of capturedCard.unlocksCardIds) {
          if (!unlockedCardIds.includes(id)) newUnlockIds.push(id)
          unlockCard(id)
        }
      }
      if (resolution.bonusInsightCardId) {
        if (!unlockedCardIds.includes(resolution.bonusInsightCardId)) {
          newUnlockIds.push(resolution.bonusInsightCardId)
        }
        unlockCard(resolution.bonusInsightCardId)
      }
      setNewUnlocks(newUnlockIds)

      for (const uid of newUnlockIds) {
        const unlocked = cards.find((c) => c.id === uid)
        if (unlocked) {
          pushToast({
            icon: unlocked.kind === 'skill' ? '\u2728' : unlocked.kind === 'insight' ? '\u{1F4A1}' : '\u{1F0CF}',
            title: `New ${unlocked.kind} card`,
            body: unlocked.title,
            kind: 'unlock',
          })
        }
      }

      recordQuestOutcome(quest.id, {
        tier: resolution.tier,
        narrative: resolution.narrative,
        xpEarned: totalXp,
        roll: resolution.baseRoll,
        modifier: resolution.modifierTotal,
        timestamp: Date.now(),
      })

      setQuestResolved(true)
      setIsRolling(false)
    }, 1200)
  }

  const handleUseDialogueCard = () => {
    if (!activeCard || activeCard.kind !== 'dialogue' || dialoguePlayed) return
    const modifier = activeCard.rollModifier ?? 0
    setPendingRollModifier((pendingRollModifier ?? 0) + modifier)
    setPlayedCards((prev) => [
      ...prev,
      {
        card: activeCard,
        effect: activeCard.contextNote ?? `+${modifier} to your next roll`,
        modifier,
      },
    ])
    setDialoguePlayed(true)
    setActiveCard(null)
  }

  const handleUseInsightCard = () => {
    if (!activeCard || activeCard.kind !== 'insight') return
    const insightBonus = 2
    setPendingRollModifier((pendingRollModifier ?? 0) + insightBonus)
    setPlayedCards((prev) => [
      ...prev,
      {
        card: activeCard,
        effect: activeCard.oneTimeEffect ?? '+2 to your next roll',
        modifier: insightBonus,
      },
    ])
    spendInsightCard(activeCard.id)
    setActiveCard(null)
  }

  const handleFocusSkill = () => {
    if (!activeCard || activeCard.kind !== 'skill') return
    if (focusedSkillId === activeCard.id) {
      setFocusedSkillId(null)
      setPlayedCards((prev) => prev.filter((p) => p.card.id !== activeCard.id))
    } else {
      setPlayedCards((prev) => {
        const withoutOldFocus = prev.filter((p) => p.card.kind !== 'skill')
        return [
          ...withoutOldFocus,
          {
            card: activeCard,
            effect: activeCard.passiveBonus ?? 'Focused: +1 additional bonus',
            modifier: 1,
          },
        ]
      })
      setFocusedSkillId(activeCard.id)
    }
    setActiveCard(null)
  }

  const isCardPlayed = (cardId: string) => playedCards.some((p) => p.card.id === cardId)
  const isCardFocused = (cardId: string) => focusedSkillId === cardId

  const renderActionsForCard = () => {
    if (!activeCard) return null

    if (activeCard.kind === 'quest') {
      return (
        <button
          type="button"
          className="br-button"
          onClick={handleUseQuestCard}
          disabled={questResolved || isRolling}
        >
          {questResolved
            ? 'Quest resolved'
            : isRolling
              ? 'Rolling...'
              : `Resolve quest (d20 ${totalModifier > 0 ? `+ ${totalModifier}` : totalModifier < 0 ? `${totalModifier}` : ''})`}
        </button>
      )
    }

    if (activeCard.kind === 'dialogue') {
      if (dialoguePlayed) {
        return (
          <span className="br-muted">Dialogue already played this encounter.</span>
        )
      }
      return (
        <button type="button" className="br-button" onClick={handleUseDialogueCard}>
          Play card (+{activeCard.rollModifier ?? 0} to roll)
        </button>
      )
    }

    if (activeCard.kind === 'insight') {
      const alreadySpent = spentInsightCardIds.includes(activeCard.id)
      if (alreadySpent) {
        return <span className="br-muted">This insight has been spent.</span>
      }
      return (
        <button type="button" className="br-button" onClick={handleUseInsightCard}>
          Spend insight (+2 to roll)
        </button>
      )
    }

    if (activeCard.kind === 'skill') {
      const isFocused = focusedSkillId === activeCard.id
      return (
        <button type="button" className="br-button" onClick={handleFocusSkill}>
          {isFocused ? 'Unfocus this skill' : 'Focus this skill (+1 extra)'}
        </button>
      )
    }

    return null
  }

  return (
    <div className="br-stack">
      {completedQuestIds.length === 0 && !questResolved && !showedGuidance && (
        <div className="br-guidance">
          <div className="br-guidance-title">How encounters work</div>
          <ol>
            <li><strong>Play cards</strong> from your hand to build modifiers</li>
            <li><strong>Focus</strong> a skill card for an extra +1 bonus</li>
            <li>Play a <strong>Dialogue</strong> or <strong>Insight</strong> card for a bigger boost</li>
            <li>Select the <strong>Quest</strong> card and tap <strong>"Resolve"</strong> to roll the d20</li>
          </ol>
          <button type="button" className="br-guidance-dismiss" onClick={() => setShowedGuidance(true)}>
            Got it
          </button>
        </div>
      )}

      <span className="br-dice-label">Hand of cards</span>

      <div className="br-card-row">
        {hand.map((card) => {
          const played = isCardPlayed(card.id)
          const focused = isCardFocused(card.id)
          return (
            <div key={card.id} className={`br-card-slot ${played ? 'is-played' : ''} ${focused ? 'is-focused' : ''}`}>
              <CardView
                card={card}
                isSelected={activeCard?.id === card.id}
                onSelect={() => handleCardClick(card)}
              />
              {played && card.kind !== 'skill' && (
                <span className="br-card-played-badge">Played</span>
              )}
              {focused && (
                <span className="br-card-focused-badge">Focused</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Prep board: shows all stacked modifiers */}
      {!questResolved && !isRolling && !diceResolution && (playedCards.length > 0 || passiveSkillBonus > 0) && (
        <div className="br-prep-board">
          <div className="br-prep-header">
            <span className="br-dice-label">Roll preparation</span>
            <span className="br-prep-total">
              Total: {totalModifier >= 0 ? '+' : ''}{totalModifier}
            </span>
          </div>
          <div className="br-prep-rows">
            {passiveSkillBonus > 0 && (
              <div className="br-prep-row">
                <span className="br-prep-source">
                  <span className={`br-chip skill`}>skill</span>
                  Passive skills ({unlockedCardIds.filter((id) => id.startsWith('card-skill-')).length} unlocked, max +3)
                </span>
                <span className="br-prep-value">+{passiveSkillBonus}</span>
              </div>
            )}
            {playedCards.map((p) => (
              <div key={p.card.id} className="br-prep-row">
                <span className="br-prep-source">
                  <span className={`br-chip ${p.card.kind}`}>{p.card.kind}</span>
                  {p.card.title}
                </span>
                <span className="br-prep-value">+{p.modifier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card detail modal */}
      {!activeCard && !questResolved && !isRolling && !diceResolution && (
        <p className="br-muted">Tap a card to play it or see details. Build your modifiers, then resolve the quest.</p>
      )}
      {activeCard && (
        <div className="br-card-modal">
          <div className="br-card-modal-header">
            <span className={`br-chip ${activeCard.kind}`}>{activeCard.kind}</span>
            {activeCard.tags && activeCard.tags.length > 0 && (
              <span className="br-muted">{activeCard.tags.join(' \u2022 ')}</span>
            )}
          </div>
          <h3 className="br-card-modal-title">{activeCard.title}</h3>
          <p className="br-card-modal-body">{activeCard.description}</p>
          {activeCard.kind === 'quest' && (
            <p className="br-muted">
              XP reward: <strong>{activeCard.xpReward}</strong>
              {totalModifier > 0 && <> &middot; Current modifier: <strong>+{totalModifier}</strong></>}
            </p>
          )}
          {activeCard.kind === 'skill' && (
            <>
              <p className="br-muted">
                Passive: <strong>+1</strong> (always active when unlocked)
              </p>
              <p className="br-muted">
                Focus: <strong>+1 extra</strong> (one skill per encounter)
              </p>
            </>
          )}
          {activeCard.kind === 'dialogue' && (
            <>
              {activeCard.contextNote && (
                <p className="br-muted">{activeCard.contextNote}</p>
              )}
              <p className="br-muted">
                Roll modifier: <strong>+{activeCard.rollModifier ?? 0}</strong>
              </p>
            </>
          )}
          {activeCard.kind === 'insight' && activeCard.oneTimeEffect && (
            <p className="br-muted">{activeCard.oneTimeEffect}</p>
          )}
          <div className="br-card-modal-actions">
            {renderActionsForCard()}
            <button
              type="button"
              className="br-button secondary"
              onClick={() => setActiveCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isRolling && (
        <div className="br-rolling-indicator">
          <span className="br-rolling-die">{'\u2684'}</span>
          <span className="br-rolling-text">Rolling the d20...</span>
        </div>
      )}

      {diceResolution && !isRolling && (
        <div className="br-resolution-panel">
          <div className="br-card-modal-header">
            <span className="br-dice-label">Quest resolution</span>
            <span className={`br-chip ${diceResolution.tier}`}>{diceResolution.tier}</span>
          </div>

          <div className="br-resolution-dice">
            <div className="br-resolution-die">
              <span className="br-die-face">{diceResolution.baseRoll}</span>
              <span className="br-die-label">d20 roll</span>
            </div>
            {diceResolution.modifierTotal !== 0 && (
              <div className="br-resolution-modifier">
                <span className="br-modifier-value">
                  {diceResolution.modifierTotal >= 0 ? '+' : ''}
                  {diceResolution.modifierTotal}
                </span>
                <span className="br-die-label">modifiers</span>
              </div>
            )}
            <div className="br-resolution-total">
              <span className="br-total-value">{diceResolution.finalTotal}</span>
              <span className="br-die-label">total</span>
            </div>
          </div>

          {/* Show what contributed to the modifier */}
          {playedCards.length > 0 && (
            <div className="br-resolution-contributors">
              {playedCards.map((p) => (
                <span key={p.card.id} className={`br-chip ${p.card.kind}`}>
                  {p.card.title} +{p.modifier}
                </span>
              ))}
            </div>
          )}

          <div className="br-resolution-xp">
            +{earnedXp} XP earned
          </div>

          <p className="br-resolution-narrative">{diceResolution.narrative}</p>

          {newUnlocks.length > 0 && (
            <div className="br-resolution-unlocks">
              <span className="br-dice-label">Unlocked</span>
              <ul className="br-unlock-list">
                {newUnlocks.map((id) => {
                  const c = cards.find((card) => card.id === id)
                  return (
                    <li key={id} className="br-unlock-item">
                      <span className={`br-chip ${c?.kind ?? 'quest'}`}>{c?.kind ?? '?'}</span>
                      {c?.title ?? id}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <div className="br-resolution-actions">
            {nextQuest && currentRegionId && (
              <Link
                to={`/encounter/${currentRegionId}/${nextQuest.id}`}
                className="br-button"
              >
                Next: {nextQuest.title}
              </Link>
            )}
            {!nextQuest && currentRegionId && (
              <Link to={`/region/${currentRegionId}`} className="br-button">
                Back to {region?.name ?? 'region'}
              </Link>
            )}
            <Link to="/cards" className="br-button secondary">
              View card library
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
