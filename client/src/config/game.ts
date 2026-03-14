import type { RegionId } from '../types'

/**
 * Game config. Tweak these to change onboarding, starting region, or feature flags.
 */
export const GAME_CONFIG = {
  /** Region where new players start. Must exist in regions data. */
  startingRegionId: 'arlington' as RegionId,

  /** Regions revealed on first load (e.g. tutorial area). */
  startingDiscoveredRegionIds: ['arlington'] as RegionId[],

  /** Default skill card unlocked from the start. */
  defaultUnlockedSkillId: 'card-skill-inspect-system',
} as const
