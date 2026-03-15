import type { RegionId } from '../types'

export type MapRegionMeta = {
  id: RegionId
  /** Horizontal position as a percentage of the map width (0–100). */
  xPercent: number
  /** Vertical position as a percentage of the map height (0–100). */
  yPercent: number
}

/**
 * Parchment-map coordinates for major realms.
 * These are intentionally approximate and easy to tweak.
 */
export const mapRegions: MapRegionMeta[] = [
  {
    id: 'ashburn',
    xPercent: 12.5,
    yPercent: 42.5,
  },
  {
    id: 'reston',
    xPercent: 28.75,
    yPercent: 37.25,
  },
  {
    id: 'tysons',
    xPercent: 45,
    yPercent: 35.6,
  },
  {
    id: 'arlington',
    xPercent: 58.3,
    yPercent: 48.1,
  },
  {
    id: 'citadel',
    xPercent: 78.3,
    yPercent: 37.5,
  },
]

