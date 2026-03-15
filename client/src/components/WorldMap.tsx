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

const statusLabel: Record<string, string> = {
  complete: 'Complete',
  available: 'Available',
  locked: 'Locked',
  'coming-soon': 'Coming soon',
}

const statusChipClass: Record<string, string> = {
  complete: 'skill',
  available: 'quest',
  locked: 'dialogue',
  'coming-soon': 'insight',
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
    <div className="br-map-full">
      <div className="br-map-canvas">
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
                {status === 'complete' && <span className="br-map-marker-check">{'\u2713'}</span>}
                {status === 'locked' && <span className="br-map-marker-lock">{'\uD83D\uDD12'}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Floating preview overlay */}
      {activeRegion && (
        <div className="br-map-overlay">
          <div className="br-map-overlay-header">
            <span className="br-map-overlay-name">{activeRegion.name}</span>
            {activeStatus && (
              <span className={`br-chip ${statusChipClass[activeStatus]}`}>
                {statusLabel[activeStatus]}
              </span>
            )}
          </div>
          <p className="br-map-overlay-tagline">{activeRegion.tagline}</p>
          {activeStatus === 'complete' && (
            <span className="br-map-overlay-hint" style={{ color: '#5ee9ad' }}>
              All encounters completed. Click to revisit.
            </span>
          )}
          {activeStatus === 'locked' && activeRegion.prerequisiteRegionId && (
            <span className="br-map-overlay-hint" style={{ color: '#fbbf24' }}>
              Complete {getRegionById(activeRegion.prerequisiteRegionId)?.name} first.
            </span>
          )}
          {activeStatus === 'coming-soon' && (
            <span className="br-map-overlay-hint" style={{ color: '#ff8fab' }}>
              Encounters coming soon.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
