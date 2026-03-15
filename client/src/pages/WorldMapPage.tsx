import { WorldMap } from '../components/WorldMap'
import { usePageTitle } from '../hooks/usePageTitle'

export function WorldMapPage() {
  usePageTitle('World Map')

  return (
    <div className="br-map-page">
      <div className="br-map-page-header">
        <div className="br-panel-title">The Beltway Chart</div>
        <div className="br-panel-subtitle">
          Click a region to enter. Hover for details.
        </div>
      </div>
      <WorldMap />
    </div>
  )
}
