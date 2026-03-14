import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRegionById } from '../data/regions'
import { getQuestById } from '../data/quests'
import { EncounterHand } from '../components/EncounterHand'
import { useGameState } from '../state/GameStateProvider'
import { usePageTitle } from '../hooks/usePageTitle'

export function EncounterPage() {
  const { regionId, questId } = useParams()
  const region = getRegionById(regionId)
  const quest = getQuestById(questId)
  usePageTitle(quest?.title)

  const { setCurrentRegion, setActiveQuest, markRegionDiscovered } = useGameState()

  useEffect(() => {
    if (region) {
      setCurrentRegion(region.id)
      markRegionDiscovered(region.id)
    }
    if (quest) {
      setActiveQuest(quest.id)
    }
  }, [region, quest, setCurrentRegion, setActiveQuest, markRegionDiscovered])

  if (!region || !quest) {
    return (
      <section className="br-panel parchment">
        <div className="br-panel-title">Encounter not found</div>
        <p className="br-lore-body">
          This combination of region and quest does not exist in the current seed data. Try
          returning to the{' '}
          <Link to="/map" className="br-inline-link">
            world map
          </Link>{' '}
          to choose another route.
        </p>
      </section>
    )
  }

  return (
    <div className="br-grid" data-region={region.id}>
      <section className="br-panel parchment">
        <div className="br-region-badge">
          <span className={`br-chip br-region-chip-${region.id}`}>{region.name}</span>
        </div>
        <div className="br-panel-title">{quest.title}</div>
        <div className="br-panel-subtitle">
          Recommended cards:{' '}
          <span className="br-chips">
            {quest.recommendedCards.map((kind) => (
              <span key={kind} className={`br-chip ${kind}`}>
                {kind}
              </span>
            ))}
          </span>
        </div>
        <div className="br-stack">
          <p className="br-lore-body">{quest.summary}</p>
          <p className="br-lore-body">
            <strong>Objective:</strong> {quest.objective}
          </p>
          <p className="br-lore-body">
            <strong>Stakes:</strong> {quest.stakes}
          </p>
          <p className="br-muted">
            Use the cards below to decide how you approach the encounter. The d20 roll gives the
            Beltway a chance to answer back.
          </p>
        </div>
      </section>

      <aside className="br-panel">
        <div className="br-stack">
          <div>
            <div className="br-panel-title">Encounter tools</div>
            <div className="br-panel-subtitle">Card hand and d20 resolution.</div>
          </div>

          <EncounterHand key={quest.id} quest={quest} />

          <hr className="br-divider" />

          <div className="br-list-actions">
            <Link to={`/quest/${quest.id}`} className="br-button secondary">
              View lore panel
            </Link>
            <Link to={`/region/${region.id}`} className="br-button secondary">
              Back to region
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}

