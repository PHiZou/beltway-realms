export type CardKind = 'quest' | 'dialogue' | 'skill' | 'insight'

export type RegionId =
  | 'ashburn'
  | 'herndon'
  | 'reston'
  | 'tysons'
  | 'arlington'
  | 'pentagon'
  | 'citadel'
  | 'alexandria'

export type QuestId =
  | 'data-vault-awakening'
  | 'herndon-gate-handshake'
  | 'reston-node-echoes'
  | 'tysons-spires-overwatch'
  | 'citadel-summit'
  | 'arlington-overloaded-analyst'
  | 'arlington-consultant-circle'
  | 'arlington-invisible-stakeholder'
  | 'arlington-alignment-engine'
  | 'reston-phantom-standup'
  | 'reston-forked-record'
  | 'reston-retention-cliff'
  | 'reston-memory-palace'
  | 'tysons-metric-mirage'
  | 'tysons-elevator-pitch'
  | 'tysons-dashboard-of-dashboards'
  | 'tysons-prediction-market'
  | 'ashburn-cold-start'
  | 'ashburn-schema-dispute'
  | 'ashburn-latency-tax'
  | 'ashburn-vault-keeper'

export interface Region {
  id: RegionId
  name: string
  tagline: string
  flavor: string
  mapLabel: string
  defaultQuestId: QuestId
  questIds: QuestId[]
  /** When true, region has full encounter arc. When false, shows "Coming soon." */
  fullPlayable?: boolean
  /** Region that must be fully completed before this one unlocks. */
  prerequisiteRegionId?: RegionId
}

export interface Quest {
  id: QuestId
  regionId: RegionId
  title: string
  summary: string
  objective: string
  stakes: string
  recommendedCards: CardKind[]
  loreId: string
}

export interface CardBase {
  id: string
  kind: CardKind
  title: string
  description: string
  tags?: string[]
}

export interface QuestCard extends CardBase {
  kind: 'quest'
  questId?: QuestId
  regionId?: RegionId
  xpReward: number
  unlocksCardIds?: string[]
}

export interface DialogueCard extends CardBase {
  kind: 'dialogue'
  rollModifier?: number
  contextNote?: string
}

export interface SkillCard extends CardBase {
  kind: 'skill'
  passiveBonus: string
}

export interface InsightCard extends CardBase {
  kind: 'insight'
  oneTimeEffect?: string
}

export type Card = QuestCard | DialogueCard | SkillCard | InsightCard

export interface LoreEntry {
  id: string
  title: string
  body: string
  footnote?: string
}

