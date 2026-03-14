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
    // Roughly matches the Ashburn label / marker cluster in the SVG
    xPercent: 16,
    yPercent: 42,
  },
  {
    id: 'reston',
    xPercent: 27,
    yPercent: 40,
  },
  {
    id: 'tysons',
    xPercent: 36,
    yPercent: 39,
  },
  {
    id: 'arlington',
    xPercent: 46,
    yPercent: 43,
  },
  {
    id: 'citadel',
    xPercent: 55,
    yPercent: 41,
  },
]

