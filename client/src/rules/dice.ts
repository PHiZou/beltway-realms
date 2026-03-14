export type DiceOutcomeTier = 'critical' | 'success' | 'mixed' | 'failure'

export type DiceResolution = {
  baseRoll: number
  modifierTotal: number
  finalTotal: number
  tier: DiceOutcomeTier
  xpBonus: number
  narrative: string
  /** Optional bonus insight card to unlock for this outcome. */
  bonusInsightCardId?: string
}

export type DiceConfig = {
  criticalThreshold: number
  successThreshold: number
  mixedThreshold: number
  xpByTier: Record<DiceOutcomeTier, number>
}

export const DEFAULT_DICE_CONFIG: DiceConfig = {
  criticalThreshold: 20,
  successThreshold: 15,
  mixedThreshold: 10,
  xpByTier: {
    critical: 2,
    success: 1,
    mixed: 1,
    failure: 0,
  },
}

export function getTier(total: number, config: DiceConfig = DEFAULT_DICE_CONFIG): DiceOutcomeTier {
  if (total >= config.criticalThreshold) return 'critical'
  if (total >= config.successThreshold) return 'success'
  if (total >= config.mixedThreshold) return 'mixed'
  return 'failure'
}

export function resolveQuestRoll(
  baseRoll: number,
  modifierTotal: number,
  narrative: string,
  config: DiceConfig = DEFAULT_DICE_CONFIG,
): DiceResolution {
  const finalTotal = baseRoll + modifierTotal
  const tier = getTier(finalTotal, config)

  let bonusInsightCardId: string | undefined
  if (tier === 'mixed') bonusInsightCardId = 'card-insight-local-legend'
  if (tier === 'failure') bonusInsightCardId = 'card-insight-name-pattern'

  const xpBonus = config.xpByTier[tier]

  return {
    baseRoll,
    modifierTotal,
    finalTotal,
    tier,
    xpBonus,
    narrative,
    bonusInsightCardId,
  }
}

