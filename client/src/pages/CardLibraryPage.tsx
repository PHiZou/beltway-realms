import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { CardKind } from '../types'
import { cards } from '../data/cards'
import { useGameState } from '../state/GameStateProvider'
import { CardView } from '../components/CardView'
import { usePageTitle } from '../hooks/usePageTitle'

type FilterKind = 'all' | CardKind

const FILTERS: { kind: FilterKind; label: string }[] = [
  { kind: 'all', label: 'All' },
  { kind: 'skill', label: 'Skills' },
  { kind: 'dialogue', label: 'Dialogue' },
  { kind: 'insight', label: 'Insights' },
]

export function CardLibraryPage() {
  usePageTitle('Cards')
  const { state } = useGameState()
  const { unlockedCardIds, spentInsightCardIds } = state
  const [filter, setFilter] = useState<FilterKind>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const unlocked = cards.filter(
    (c) => c.kind !== 'quest' && unlockedCardIds.includes(c.id),
  )

  const filtered = filter === 'all'
    ? unlocked
    : unlocked.filter((c) => c.kind === filter)

  const selected = selectedId ? cards.find((c) => c.id === selectedId) : null

  const skillCount = unlocked.filter((c) => c.kind === 'skill').length
  const dialogueCount = unlocked.filter((c) => c.kind === 'dialogue').length
  const insightCount = unlocked.filter((c) => c.kind === 'insight').length

  return (
    <div className="br-grid">
      <section className="br-panel parchment">
        <div className="br-panel-title">Card Library</div>
        <div className="br-panel-subtitle">
          {unlocked.length} card{unlocked.length !== 1 ? 's' : ''} unlocked
          {' \u2014 '}
          {skillCount} skills, {dialogueCount} dialogue, {insightCount} insights
        </div>

        <div className="br-filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.kind}
              type="button"
              className={`br-filter-chip ${filter === f.kind ? 'is-active' : ''}`}
              onClick={() => setFilter(f.kind)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="br-card-row br-card-row-wrap">
            {filtered.map((card) => {
              const isSpent = card.kind === 'insight' && spentInsightCardIds.includes(card.id)
              return (
                <div
                  key={card.id}
                  className={`br-card-wrapper ${isSpent ? 'is-spent' : ''}`}
                >
                  <CardView
                    card={card}
                    isSelected={selectedId === card.id}
                    onSelect={() => setSelectedId(selectedId === card.id ? null : card.id)}
                  />
                  {isSpent && <span className="br-card-spent-badge">Used</span>}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="br-muted">
            {filter === 'all'
              ? <>No cards yet. Play an encounter in{' '}
                  <Link to="/region/arlington" className="br-inline-link">Arlington</Link>{' '}
                  to start unlocking.</>
              : `No ${filter} cards unlocked yet.`}
          </p>
        )}
      </section>

      <aside className="br-panel">
        {selected ? (
          <div className="br-stack">
            <div className="br-card-modal-header">
              <span className={`br-chip ${selected.kind}`}>{selected.kind}</span>
              {selected.tags && selected.tags.length > 0 && (
                <span className="br-muted">{selected.tags.join(' \u2022 ')}</span>
              )}
            </div>
            <h3 className="br-card-modal-title">{selected.title}</h3>
            <p className="br-card-modal-body">{selected.description}</p>
            {selected.kind === 'skill' && (
              <p className="br-muted">
                Passive bonus: <strong>{selected.passiveBonus}</strong>
              </p>
            )}
            {selected.kind === 'dialogue' && selected.contextNote && (
              <p className="br-muted">{selected.contextNote}</p>
            )}
            {selected.kind === 'dialogue' && selected.rollModifier != null && (
              <p className="br-muted">
                Roll modifier: <strong>+{selected.rollModifier}</strong>
              </p>
            )}
            {selected.kind === 'insight' && selected.oneTimeEffect && (
              <p className="br-muted">{selected.oneTimeEffect}</p>
            )}
            {selected.kind === 'insight' && spentInsightCardIds.includes(selected.id) && (
              <span className="br-chip failure">Spent</span>
            )}
            <button
              type="button"
              className="br-button secondary"
              onClick={() => setSelectedId(null)}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="br-stack">
            <div className="br-panel-title">Card details</div>
            <div className="br-panel-subtitle">
              Select a card to see its full description, effects, and tags.
            </div>
            <p className="br-muted">
              Skills are always active during encounters. Dialogue cards add a modifier before your
              roll. Insights are one-time +2 boosts that get spent when used.
            </p>
            <hr className="br-divider" />
            <div className="br-list-actions">
              <Link to="/region/arlington" className="br-button secondary">
                Arlington
              </Link>
              <Link to="/journal" className="br-button secondary">
                Journal
              </Link>
              <Link to="/map" className="br-button secondary">
                World map
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
