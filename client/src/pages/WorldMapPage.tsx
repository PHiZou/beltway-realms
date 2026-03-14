import { Link } from 'react-router-dom'
import { regions } from '../data/regions'
import { useGameState } from '../state/GameStateProvider'
import { WorldMap } from '../components/WorldMap'
import { usePageTitle } from '../hooks/usePageTitle'

export function WorldMapPage() {
  usePageTitle('World Map')
  const {
    state: { currentRegionId },
  } = useGameState()

  return (
    <div className="br-grid">
      <section className="br-panel">
        <div className="br-panel-title">The Beltway Chart</div>
        <div className="br-panel-subtitle">
          A parchment-style map of Northern Virginia and the Citadel of Washington.
        </div>
        <WorldMap />
      </section>

      <aside className="br-panel parchment">
        <div className="br-panel-title">Select a realm</div>
        <div className="br-panel-subtitle">
          Choose a region to view its quest hooks and lore.
        </div>
        <ul className="br-list">
          {regions.map((region) => {
            const isCurrent = region.id === currentRegionId
            return (
              <li key={region.id} className="br-list-item">
                <div className="br-list-label">
                  <span className="br-list-title">{region.name}</span>
                  <span className="br-list-subtitle">{region.tagline}</span>
                </div>
                <div className="br-list-actions">
                  {isCurrent && <span className="br-chip quest">Current</span>}
                  <Link to={`/region/${region.id}`} className="br-button secondary">
                    Enter
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}
