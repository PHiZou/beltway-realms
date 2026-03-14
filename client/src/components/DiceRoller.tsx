import { useGameState } from '../state/GameStateProvider'
import { getTier } from '../rules/dice'

export function DiceRoller() {
  const {
    state: { lastRoll },
    setLastRoll,
  } = useGameState()

  const handleRoll = () => {
    const base = 1 + Math.floor(Math.random() * 20)
    setLastRoll(base)
  }

  const rollQuality = (() => {
    if (lastRoll == null) return 'Awaiting the whims of chance.'
    const tier = getTier(lastRoll)
    switch (tier) {
      case 'critical':
        return 'Critical success. Reality briefly cooperates.'
      case 'success':
        return 'Success. You mostly get what you were aiming for.'
      case 'mixed':
        return 'Mixed. You advance, but the realms take note.'
      case 'failure':
      default:
        return 'Complication. The Beltway answers with an inconvenient truth.'
    }
  })()

  return (
    <div className="br-stack">
      <div className="br-dice-label">D20 REALM CHECK</div>
      <div className="br-dice-display">{lastRoll ?? '—'}</div>
      <p className="br-muted">{rollQuality}</p>
      <button type="button" className="br-button" onClick={handleRoll}>
        <span>Roll d20</span>
      </button>
    </div>
  )
}



