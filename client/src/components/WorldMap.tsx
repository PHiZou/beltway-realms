import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mapRegions } from '../data/mapRegions'
import { getRegionById } from '../data/regions'
import { quests } from '../data/quests'
import { useGameState } from '../state/GameStateProvider'

function getRegionStatus(
  regionId: string,
  completedQuestIds: string[],
): 'complete' | 'available' | 'locked' | 'coming-soon' {
  const region = getRegionById(regionId)
  if (!region) return 'coming-soon'
  if (!region.fullPlayable) return 'coming-soon'

  const regionQuests = quests.filter((q) => q.regionId === regionId)
  const allDone = regionQuests.length > 0 && regionQuests.every((q) => completedQuestIds.includes(q.id))
  if (allDone) return 'complete'

  if (region.prerequisiteRegionId) {
    const prereqQuests = quests.filter((q) => q.regionId === region.prerequisiteRegionId)
    const prereqDone = prereqQuests.every((q) => completedQuestIds.includes(q.id))
    if (!prereqDone) return 'locked'
  }

  return 'available'
}

export function WorldMap() {
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const {
    state: { currentRegionId, discoveredRegionIds, completedQuestIds },
  } = useGameState()

  const activeId = hoveredId ?? currentRegionId ?? mapRegions[0]?.id ?? null
  const activeRegion = activeId ? getRegionById(activeId) : undefined
  const activeStatus = activeId ? getRegionStatus(activeId, completedQuestIds) : null

  return (
    <div className="br-map-shell">
      <div className="br-map-surface">
        <div className="br-map-parchment">
          <img
            src="/img/maps/beltway-realms.svg"
            alt="Parchment chart of the Beltway Realms"
            className="br-map-image"
          />

          {mapRegions.map((meta) => {
            const region = getRegionById(meta.id)
            if (!region) return null
            const isCurrent = currentRegionId === region.id
            const isDiscovered = discoveredRegionIds.includes(region.id)
            const status = getRegionStatus(region.id, completedQuestIds)

            return (
              <button
                key={region.id}
                type="button"
                className={[
                  'br-map-marker',
                  isCurrent ? 'is-current' : '',
                  isDiscovered ? 'is-discovered' : 'is-hidden',
                  `is-${status}`,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  left: `${meta.xPercent}%`,
                  top: `${meta.yPercent}%`,
                }}
                onClick={() => navigate(`/region/${region.id}`)}
                onMouseEnter={() => setHoveredId(region.id)}
                onMouseLeave={() => setHoveredId((current) => (current === region.id ? null : current))}
                aria-label={region.name}
              >
                <span className="br-map-marker-dot" />
                <span className="br-map-marker-label">{region.mapLabel}</span>
                {status === 'complete' && <span className="br-map-marker-check">{'\u2713'}</span>}
                {status === 'locked' && <span className="br-map-marker-lock">{'\uD83D\uDD12'}</span>}
              </button>
            )
          })}
        </div>
      </div>

      <aside className="br-map-preview">
        {activeRegion ? (
          <>
            <div className="br-panel-title">
              Realm preview
              {activeStatus && (
                <span
                  className={`br-chip ${
                    activeStatus === 'complete' ? 'skill' :
                    activeStatus === 'available' ? 'quest' :
                    activeStatus === 'locked' ? 'dialogue' :
                    'insight'
                  }`}
                  style={{ marginLeft: '0.5rem', textTransform: 'capitalize' }}
                >
                  {activeStatus === 'coming-soon' ? 'Coming soon' : activeStatus}
                </span>
              )}
            </div>
            <div className="br-panel-subtitle">{activeRegion.name}</div>
            <p className="br-lore-body" style={{ marginBottom: '0.5rem' }}>
              {activeRegion.flavor}
            </p>
            {activeStatus === 'complete' && (
              <p className="br-muted" style={{ color: '#4ade80' }}>
                All encounters completed. Click to revisit.
              </p>
            )}
            {activeStatus === 'locked' && activeRegion.prerequisiteRegionId && (
              <p className="br-muted" style={{ color: '#fbbf24' }}>
                Complete {getRegionById(activeRegion.prerequisiteRegionId)?.name ?? 'the prerequisite region'} first.
              </p>
            )}
            {activeStatus === 'coming-soon' && (
              <p className="br-muted" style={{ color: '#f472b6' }}>
                Encounters not yet built for this region.
              </p>
            )}
            {activeStatus === 'available' && (
              <p className="br-muted">
                Click to enter the region and begin encounters.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="br-panel-title">Realm preview</div>
            <p className="br-muted">Hover or select a realm marker on the map.</p>
          </>
        )}
      </aside>
    </div>
  )
}
