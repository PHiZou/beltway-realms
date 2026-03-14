export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  check: (ctx: AchievementContext) => boolean
}

export type AchievementContext = {
  completedQuestIds: string[]
  unlockedCardIds: string[]
  discoveredRegionIds: string[]
  xp: number
  spentInsightCardIds: string[]
}

export const achievements: Achievement[] = [
  {
    id: 'first-blood',
    title: 'First Encounter',
    description: 'Complete your first quest.',
    icon: '\u2694',
    check: (ctx) => ctx.completedQuestIds.length >= 1,
  },
  {
    id: 'arlington-cleared',
    title: 'Arlington Navigator',
    description: 'Complete all four Arlington encounters.',
    icon: '\u2606',
    check: (ctx) =>
      ['arlington-overloaded-analyst', 'arlington-consultant-circle', 'arlington-invisible-stakeholder', 'arlington-alignment-engine']
        .every((id) => ctx.completedQuestIds.includes(id)),
  },
  {
    id: 'reston-cleared',
    title: 'Memory Keeper',
    description: 'Complete all four Reston encounters.',
    icon: '\u{1F4DC}',
    check: (ctx) =>
      ['reston-phantom-standup', 'reston-forked-record', 'reston-retention-cliff', 'reston-memory-palace']
        .every((id) => ctx.completedQuestIds.includes(id)),
  },
  {
    id: 'tysons-cleared',
    title: 'Metric Breaker',
    description: 'Complete all four Tysons encounters.',
    icon: '\u{1F4CA}',
    check: (ctx) =>
      ['tysons-metric-mirage', 'tysons-elevator-pitch', 'tysons-dashboard-of-dashboards', 'tysons-prediction-market']
        .every((id) => ctx.completedQuestIds.includes(id)),
  },
  {
    id: 'ashburn-cleared',
    title: 'Infrastructure Whisperer',
    description: 'Complete all four Ashburn encounters.',
    icon: '\u{1F5A7}',
    check: (ctx) =>
      ['ashburn-cold-start', 'ashburn-schema-dispute', 'ashburn-latency-tax', 'ashburn-vault-keeper']
        .every((id) => ctx.completedQuestIds.includes(id)),
  },
  {
    id: 'card-collector-5',
    title: 'Card Collector',
    description: 'Unlock 5 or more cards.',
    icon: '\u2660',
    check: (ctx) => ctx.unlockedCardIds.length >= 5,
  },
  {
    id: 'card-collector-15',
    title: 'Full Deck',
    description: 'Unlock 15 or more cards.',
    icon: '\u2663',
    check: (ctx) => ctx.unlockedCardIds.length >= 15,
  },
  {
    id: 'xp-10',
    title: 'Seasoned Traveler',
    description: 'Earn 10 or more XP.',
    icon: '\u2B50',
    check: (ctx) => ctx.xp >= 10,
  },
  {
    id: 'xp-25',
    title: 'Beltway Veteran',
    description: 'Earn 25 or more XP.',
    icon: '\u{1F3C6}',
    check: (ctx) => ctx.xp >= 25,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Discover all regions on the map.',
    icon: '\u{1F5FA}',
    check: (ctx) => ctx.discoveredRegionIds.length >= 5,
  },
  {
    id: 'insight-spender',
    title: 'Wisdom Applied',
    description: 'Spend at least one insight card.',
    icon: '\u{1F4A1}',
    check: (ctx) => ctx.spentInsightCardIds.length >= 1,
  },
  {
    id: 'completionist',
    title: 'Beltway Completionist',
    description: 'Complete all 16 encounters across all four regions.',
    icon: '\u{1F451}',
    check: (ctx) => ctx.completedQuestIds.length >= 16,
  },
]

export function getUnlockedAchievements(ctx: AchievementContext): Achievement[] {
  return achievements.filter((a) => a.check(ctx))
}
