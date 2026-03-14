import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRegionById, regions } from '../data/regions'
import { quests } from '../data/quests'
import { useGameState } from '../state/GameStateProvider'
import { usePageTitle } from '../hooks/usePageTitle'

export function RegionPage() {
  const { regionId } = useParams()
  const region = getRegionById(regionId)
  const { state, setCurrentRegion, markRegionDiscovered } = useGameState()
  usePageTitle(region?.name)

  useEffect(() => {
    if (!region) return
    setCurrentRegion(region.id)
    markRegionDiscovered(region.id)
  }, [region, setCurrentRegion, markRegionDiscovered])

  if (!region) {
    return (
      <section className="br-panel parchment">
        <div className="br-panel-title">Unknown realm</div>
        <p className="br-lore-body">
          This region id is not part of the current Beltway chart. Try returning to the{' '}
          <Link to="/map" className="br-inline-link">
            world map
          </Link>
          .
        </p>
      </section>
    )
  }

  const regionQuests = quests.filter((q) => q.regionId === region.id)
  const completedInRegion = regionQuests.filter((q) =>
    state.completedQuestIds.includes(q.id),
  ).length
  const totalInRegion = regionQuests.length
  const isFullyPlayable = region.fullPlayable === true

  const prerequisiteRegion = region.prerequisiteRegionId
    ? getRegionById(region.prerequisiteRegionId)
    : null
  const prerequisiteMet = !prerequisiteRegion
    || quests
        .filter((q) => q.regionId === prerequisiteRegion.id)
        .every((q) => state.completedQuestIds.includes(q.id))

  const nextPlayableRegion = regions.find(
    (r) => r.fullPlayable && r.id !== region.id && !quests
      .filter((q) => q.regionId === r.id)
      .every((q) => state.completedQuestIds.includes(q.id)),
  )

  return (
    <div className="br-grid">
      <section className="br-panel parchment">
        {!isFullyPlayable && (
          <div className="br-coming-soon">
            <span className="br-chip skill">Coming soon</span>
            <span>Full encounter arc not yet built.</span>
          </div>
        )}
        {isFullyPlayable && !prerequisiteMet && prerequisiteRegion && (
          <div className="br-locked-banner">
            <span className="br-chip quest">Locked</span>
            <span>
              Complete all encounters in{' '}
              <Link to={`/region/${prerequisiteRegion.id}`} className="br-inline-link">
                {prerequisiteRegion.name}
              </Link>{' '}
              to unlock this region.
            </span>
          </div>
        )}
        <div className="br-panel-title">{region.name}</div>
        <div className="br-panel-subtitle">{region.tagline}</div>
        <p className="br-lore-body">
          {region.flavor}
        </p>
        {isFullyPlayable && totalInRegion > 0 && (
          <div className="br-region-progress">
            <span className="br-chip quest">
              {completedInRegion} / {totalInRegion} encounters
            </span>
            {completedInRegion === totalInRegion && (
              <>
                <span className="br-chip skill">Region complete</span>
                <p className="br-completion-message">
                  {region.id === 'arlington' &&
                    `You have navigated the Fragmentation. The Alignment Engine has been tuned. The Reston Node awaits\u2014where institutional memory decides what the future is allowed to know.`}
                  {region.id === 'reston' &&
                    `The Memory Palace has been recalibrated. You have learned that forgetting can be as important as remembering. The Tysons Spires await\u2014where metrics replace reality until nobody can tell the difference.`}
                  {region.id === 'tysons' &&
                    `The Prediction Market is settled. You have seen how numbers shape behavior and how behavior reshapes numbers. The Ashburn Data Dominion awaits\u2014where infrastructure is invisible until it breaks.`}
                  {region.id === 'ashburn' &&
                    `The Vault Keeper has been recalibrated. You have seen the systems behind the systems\u2014the cables, the schemas, the silent contracts that keep everything running. The deeper Beltway\u2014the Citadel, the Pentagon, Alexandria\u2014stirs with problems that do not fit in any rack.`}
                </p>
              </>
            )}
          </div>
        )}
        <p className="br-muted">
          The Beltway Realms treat this area as its own jurisdiction of story hooks and decision
          points. Use it as a backdrop for portfolio entries, case studies, or one-off vignettes.
        </p>
      </section>

      <aside className="br-panel">
        <div className="br-panel-title">Quests anchored here</div>
        <div className="br-panel-subtitle">
          Each quest leads into an encounter screen and a lore panel.
        </div>
        {regionQuests.length === 0 ? (
          <p className="br-muted">This realm is quiet for now. Future quests can be added here.</p>
        ) : (
          <ul className="br-list">
            {regionQuests.map((quest, idx) => {
              const isComplete = state.completedQuestIds.includes(quest.id)
              const isBoss = quest.title.startsWith('Boss:')
              const isLocked = isFullyPlayable && !prerequisiteMet
              return (
                <li
                  key={quest.id}
                  className={`br-list-item ${isComplete ? 'is-complete' : ''} ${isLocked ? 'is-locked' : ''}`}
                >
                  <div className="br-list-label">
                    <span className="br-list-title">
                      {isFullyPlayable && totalInRegion > 1 && (
                        <span className="br-quest-number">
                          {isBoss ? '\u2605' : idx + 1}.
                        </span>
                      )}{' '}
                      {quest.title}
                    </span>
                    <span className="br-list-subtitle">{quest.summary}</span>
                  </div>
                  <div className="br-list-actions">
                    {isComplete && <span className="br-chip skill">Done</span>}
                    {isLocked ? (
                      <span className="br-chip quest" style={{ opacity: 0.6 }}>Locked</span>
                    ) : (
                      <>
                        <Link
                          to={`/encounter/${region.id}/${quest.id}`}
                          className="br-button secondary"
                        >
                          Encounter
                        </Link>
                        <Link to={`/quest/${quest.id}`} className="br-button secondary">
                          Lore
                        </Link>
                      </>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {isFullyPlayable && completedInRegion === totalInRegion && nextPlayableRegion && (
          <div style={{ marginTop: '0.75rem' }}>
            <Link to={`/region/${nextPlayableRegion.id}`} className="br-button">
              Continue to {nextPlayableRegion.name}
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
