import type { Card, QuestCard, RegionId, QuestId } from '../types'

export const cards: Card[] = [
  // Quest cards
  {
    id: 'card-quest-arlington-analyst',
    kind: 'quest',
    title: 'Sit With the Analyst',
    description:
      'Shadow the overloaded analyst for a day. Watch what work actually flows through them, not what the org chart claims.',
    tags: ['arlington', 'quest', 'observation'],
    questId: 'arlington-overloaded-analyst',
    regionId: 'arlington',
    xpReward: 1,
    unlocksCardIds: ['card-skill-arlington-systems-map', 'card-skill-arlington-handoffs'],
  },
  {
    id: 'card-quest-arlington-consultants',
    kind: 'quest',
    title: 'Break the Circle',
    description:
      'Pause the consultant carousel long enough to agree on one shared outcome and who must be in the room to own it.',
    tags: ['arlington', 'quest', 'facilitation'],
    questId: 'arlington-consultant-circle',
    regionId: 'arlington',
    xpReward: 1,
    unlocksCardIds: ['card-dialogue-arlington-clarifying-question', 'card-skill-arlington-bottleneck'],
  },
  {
    id: 'card-quest-arlington-stakeholder',
    kind: 'quest',
    title: 'Name the “They”',
    description:
      'Follow the approvals chain until you meet the person everyone gestures toward but nobody has briefed.',
    tags: ['arlington', 'quest', 'stakeholders'],
    questId: 'arlington-invisible-stakeholder',
    regionId: 'arlington',
    xpReward: 2,
    unlocksCardIds: ['card-skill-arlington-boundary-mapper'],
  },
  {
    id: 'card-quest-arlington-engine',
    kind: 'quest',
    title: 'Tune the Alignment Engine',
    description:
      'Adjust the dials of the Alignment Engine so it quietly rewards connective work and reduces incentives for solo heroics.',
    tags: ['arlington', 'quest', 'boss'],
    questId: 'arlington-alignment-engine',
    regionId: 'arlington',
    xpReward: 3,
    unlocksCardIds: [
      'card-insight-name-pattern',
      'card-insight-local-legend',
      'card-insight-second-chance',
    ],
  },
  {
    id: 'card-quest-ashburn-vault',
    kind: 'quest',
    title: 'Trace the Vault Signal',
    description:
      'Follow the reawakened Ashburn data-vault’s broadcast path and decide who deserves to hear it first.',
    tags: ['quest', 'investigation'],
    questId: 'data-vault-awakening',
    regionId: 'ashburn',
    xpReward: 2,
    unlocksCardIds: ['card-skill-inspect-system'],
  },
  {
    id: 'card-quest-herndon-handshake',
    kind: 'quest',
    title: 'Negotiate the Handshake',
    description:
      'Broker a shared protocol between the visiting shard and the Herndon Gate without collapsing any side’s story.',
    tags: ['quest', 'diplomacy'],
    questId: 'herndon-gate-handshake',
    regionId: 'herndon',
    xpReward: 2,
    unlocksCardIds: ['card-skill-rapid-prototype'],
  },

  // Reston quest cards
  {
    id: 'card-quest-reston-phantom',
    kind: 'quest',
    title: 'Trace the Ghost Protocol',
    description:
      'Find who still acts on the phantom standup and decide whether the ritual should be revived, replaced, or formally retired.',
    tags: ['reston', 'quest', 'process'],
    questId: 'reston-phantom-standup',
    regionId: 'reston',
    xpReward: 1,
    unlocksCardIds: ['card-skill-reston-ritual-archaeologist', 'card-skill-reston-signal-reader'],
  },
  {
    id: 'card-quest-reston-forked',
    kind: 'quest',
    title: 'Merge the Fork',
    description:
      'Reconcile two competing records into something both departments can trust, or at least stop accidentally contradicting.',
    tags: ['reston', 'quest', 'records'],
    questId: 'reston-forked-record',
    regionId: 'reston',
    xpReward: 2,
    unlocksCardIds: ['card-dialogue-reston-read-the-room', 'card-skill-reston-version-control'],
  },
  {
    id: 'card-quest-reston-retention',
    kind: 'quest',
    title: 'Capture Before the Cliff',
    description:
      'Interview departing staff and extract the "why" behind the "what" before institutional memory walks out the door.',
    tags: ['reston', 'quest', 'knowledge'],
    questId: 'reston-retention-cliff',
    regionId: 'reston',
    xpReward: 2,
    unlocksCardIds: ['card-skill-reston-knowledge-cartographer'],
  },
  {
    id: 'card-quest-reston-palace',
    kind: 'quest',
    title: 'Teach the Palace to Forget',
    description:
      'Reconfigure the Memory Palace so it weights recency and relevance, letting outdated policies decay instead of accumulating forever.',
    tags: ['reston', 'quest', 'boss'],
    questId: 'reston-memory-palace',
    regionId: 'reston',
    xpReward: 3,
    unlocksCardIds: [
      'card-insight-institutional-ghost',
      'card-insight-selective-amnesia',
    ],
  },

  // Arlington-specific dialogue
  {
    id: 'card-dialogue-arlington-clarifying-question',
    kind: 'dialogue',
    title: 'Ask the Second Question',
    description:
      'When someone states a requirement, ask what they would do if they got it tomorrow. Listen for confusion, not just confidence.',
    tags: ['arlington', 'dialogue', 'clarity'],
    rollModifier: 1,
    contextNote:
      'Use before rolls where misunderstanding could be more dangerous than delay. Slightly improves your odds.',
  },
  {
    id: 'card-quest-reston-echo',
    kind: 'quest',
    title: 'Catalog the Echoes',
    description:
      'Decide which phantom meeting recordings from the Reston Node should become part of the permanent record.',
    tags: ['quest', 'memory'],
    questId: 'reston-node-echoes',
    regionId: 'reston',
    xpReward: 2,
    unlocksCardIds: ['card-skill-inspect-system'],
  },
  {
    id: 'card-quest-tysons-overwatch',
    kind: 'quest',
    title: 'Audit the Skyline Grid',
    description:
      'Walk the Tysons Spires from street-level to observation deck and decide how predictive tags should be used, if at all.',
    tags: ['quest', 'systems'],
    questId: 'tysons-spires-overwatch',
    regionId: 'tysons',
    xpReward: 3,
    unlocksCardIds: ['card-skill-rapid-prototype'],
  },
  {
    id: 'card-quest-citadel-summit',
    kind: 'quest',
    title: 'Carry Stories to the Summit',
    description:
      'Bring voices from outer realms into the Citadel summit and argue which worlds deserve official recognition.',
    tags: ['quest', 'representation'],
    questId: 'citadel-summit',
    regionId: 'citadel',
    xpReward: 4,
    unlocksCardIds: ['card-skill-inspect-system', 'card-skill-rapid-prototype'],
  },

  // Ashburn quest cards
  {
    id: 'card-quest-ashburn-cold-start',
    kind: 'quest',
    title: 'Broker the Migration',
    description:
      'Sit with all three teams and their dependency maps. Find the order that lets everyone move without stepping on each other.',
    tags: ['ashburn', 'quest', 'infrastructure'],
    questId: 'ashburn-cold-start',
    regionId: 'ashburn',
    xpReward: 2,
    unlocksCardIds: ['card-skill-ashburn-capacity-planner', 'card-skill-ashburn-dependency-tracer'],
  },
  {
    id: 'card-quest-ashburn-schema',
    kind: 'quest',
    title: 'Resolve the Schema',
    description:
      'Mediate between normalization and performance. The answer may be neither—or both, with a clean boundary.',
    tags: ['ashburn', 'quest', 'data'],
    questId: 'ashburn-schema-dispute',
    regionId: 'ashburn',
    xpReward: 2,
    unlocksCardIds: ['card-dialogue-ashburn-trace-the-wire', 'card-skill-ashburn-schema-diplomat'],
  },
  {
    id: 'card-quest-ashburn-latency',
    kind: 'quest',
    title: 'Find the Hidden Hop',
    description:
      'Trace every millisecond of the service path until you find the layer that nobody remembers adding.',
    tags: ['ashburn', 'quest', 'debugging'],
    questId: 'ashburn-latency-tax',
    regionId: 'ashburn',
    xpReward: 2,
    unlocksCardIds: ['card-skill-ashburn-latency-hunter'],
  },
  {
    id: 'card-quest-ashburn-keeper',
    kind: 'quest',
    title: 'Update the Keeper',
    description:
      'Crack the credentials, audit the retention rules, and recalibrate the Vault Keeper for the world it actually serves.',
    tags: ['ashburn', 'quest', 'boss'],
    questId: 'ashburn-vault-keeper',
    regionId: 'ashburn',
    xpReward: 3,
    unlocksCardIds: [
      'card-insight-infrastructure-debt',
      'card-insight-silent-contract',
    ],
  },

  // Tysons quest cards
  {
    id: 'card-quest-tysons-mirage',
    kind: 'quest',
    title: 'Expose the Mirage',
    description:
      'Walk the floors with a clipboard and a single question: "What would have to be true for this number to turn red?"',
    tags: ['tysons', 'quest', 'metrics'],
    questId: 'tysons-metric-mirage',
    regionId: 'tysons',
    xpReward: 2,
    unlocksCardIds: ['card-skill-tysons-metric-skeptic', 'card-skill-tysons-floor-walker'],
  },
  {
    id: 'card-quest-tysons-elevator',
    kind: 'quest',
    title: 'Survive the Elevator',
    description:
      'Instead of pitching, ask the person next to you what they wish someone would ask them about their work.',
    tags: ['tysons', 'quest', 'culture'],
    questId: 'tysons-elevator-pitch',
    regionId: 'tysons',
    xpReward: 1,
    unlocksCardIds: ['card-dialogue-tysons-slow-question', 'card-skill-tysons-listening-post'],
  },
  {
    id: 'card-quest-tysons-dashboard',
    kind: 'quest',
    title: 'Distill the Dashboard',
    description:
      'Reduce 400 metrics to the 5 that would actually change a decision. Present the result without slides.',
    tags: ['tysons', 'quest', 'focus'],
    questId: 'tysons-dashboard-of-dashboards',
    regionId: 'tysons',
    xpReward: 2,
    unlocksCardIds: ['card-skill-tysons-signal-distiller'],
  },
  {
    id: 'card-quest-tysons-market',
    kind: 'quest',
    title: 'Settle the Market',
    description:
      'Decide whether the prediction market should be elevated, integrated, or quietly allowed to keep running in the shadows.',
    tags: ['tysons', 'quest', 'boss'],
    questId: 'tysons-prediction-market',
    regionId: 'tysons',
    xpReward: 3,
    unlocksCardIds: [
      'card-insight-quiet-signal',
      'card-insight-goodharts-ghost',
    ],
  },

  // Tysons-specific dialogue
  {
    id: 'card-dialogue-tysons-slow-question',
    kind: 'dialogue',
    title: 'The Slow Question',
    description:
      'Ask a question that cannot be answered in thirty seconds. Watch what happens when the elevator doors close and the conversation has to continue on foot.',
    tags: ['tysons', 'dialogue', 'depth'],
    rollModifier: 2,
    contextNote:
      'Use to break through pitch culture. The bonus reflects the advantage of genuine inquiry over performance.',
  },

  // Reston-specific dialogue
  {
    id: 'card-dialogue-reston-read-the-room',
    kind: 'dialogue',
    title: 'Read the Room',
    description:
      'Before speaking, watch who looks at whom when the hard topic comes up. The real power structure reveals itself in glances.',
    tags: ['reston', 'dialogue', 'observation'],
    rollModifier: 2,
    contextNote:
      'Use when entering a room where history matters more than hierarchy. The bonus reflects better situational awareness.',
  },

  // Ashburn-specific dialogue
  {
    id: 'card-dialogue-ashburn-trace-the-wire',
    kind: 'dialogue',
    title: 'Trace the Wire',
    description:
      'Before debating architecture, physically follow the cable path from rack to rack. The infrastructure tells a story the diagrams forgot.',
    tags: ['ashburn', 'dialogue', 'infrastructure'],
    rollModifier: 2,
    contextNote:
      'Use when the conversation is too abstract. The bonus reflects the advantage of ground-truth over documentation.',
  },

  // Dialogue cards
  {
    id: 'card-dialogue-open-channel',
    kind: 'dialogue',
    title: 'Open Channel',
    description:
      'Invite the other side to speak first. Ask what they are protecting, not just what they want.',
    tags: ['dialogue', 'empathy'],
    rollModifier: 1,
    contextNote: 'Grants a small positive nudge to your next roll.',
  },
  {
    id: 'card-dialogue-close-loop',
    kind: 'dialogue',
    title: 'Close the Loop',
    description:
      'Restate agreements aloud and have each party echo them back in their own language.',
    tags: ['dialogue', 'alignment'],
    rollModifier: 2,
    contextNote: 'Use when you are formalizing a decision or treaty.',
  },

  // Skill cards (passive)
  {
    id: 'card-skill-arlington-systems-map',
    kind: 'skill',
    title: 'Systems Sketcher',
    description:
      'You can turn a messy description into a one-page picture that people recognize as their world.',
    tags: ['arlington', 'skill', 'systems'],
    passiveBonus: '+1 when you describe how two or more systems relate on a napkin, whiteboard, or chat sketch.',
  },
  {
    id: 'card-skill-arlington-boundary-mapper',
    kind: 'skill',
    title: 'Boundary Mapper',
    description:
      'You surface who actually owns which part of a problem, even when the org chart disagrees.',
    tags: ['arlington', 'skill', 'ownership'],
    passiveBonus: '+1 when you propose clear ownership slices for a tangled effort.',
  },
  {
    id: 'card-skill-arlington-handoffs',
    kind: 'skill',
    title: 'Map the Handoffs',
    description:
      'You trace where work passes from one person or system to another, and where it gets dropped.',
    tags: ['arlington', 'skill', 'flow'],
    passiveBonus: '+1 when you diagram or name a handoff that everyone recognizes but nobody owns.',
  },
  {
    id: 'card-skill-arlington-bottleneck',
    kind: 'skill',
    title: 'Name the Bottleneck',
    description:
      'You call out the single constraint that everything else is waiting on—without blaming the person holding it.',
    tags: ['arlington', 'skill', 'constraint'],
    passiveBonus: '+1 when you identify the one bottleneck that, if eased, would unblock the rest.',
  },
  {
    id: 'card-skill-tysons-metric-skeptic',
    kind: 'skill',
    title: 'Metric Skeptic',
    description:
      'You ask "what behavior does this metric incentivize?" before trusting any dashboard.',
    tags: ['tysons', 'skill', 'metrics'],
    passiveBonus: '+1 when you question whether a metric measures what it claims to.',
  },
  {
    id: 'card-skill-tysons-floor-walker',
    kind: 'skill',
    title: 'Floor Walker',
    description:
      'You verify claims by walking the floors. What the dashboard says and what the hallway shows are different stories.',
    tags: ['tysons', 'skill', 'observation'],
    passiveBonus: '+1 when you gather ground-truth evidence to compare against reported data.',
  },
  {
    id: 'card-skill-tysons-listening-post',
    kind: 'skill',
    title: 'Listening Post',
    description:
      'You create space for the ideas that do not survive the elevator: the slow, the complex, the essential.',
    tags: ['tysons', 'skill', 'culture'],
    passiveBonus: '+1 when you advocate for work that cannot be compressed into a pitch.',
  },
  {
    id: 'card-skill-tysons-signal-distiller',
    kind: 'skill',
    title: 'Signal Distiller',
    description:
      'From any wall of data, you extract the one number that would actually change a decision.',
    tags: ['tysons', 'skill', 'focus'],
    passiveBonus: '+1 when you reduce a complex report to its decision-relevant core.',
  },
  {
    id: 'card-skill-reston-ritual-archaeologist',
    kind: 'skill',
    title: 'Ritual Archaeologist',
    description:
      'You dig up the original reason behind a process and explain it to people who inherited the ritual without the context.',
    tags: ['reston', 'skill', 'process'],
    passiveBonus: '+1 when you trace a current practice back to its origin story.',
  },
  {
    id: 'card-skill-reston-signal-reader',
    kind: 'skill',
    title: 'Signal Reader',
    description:
      'You can tell the difference between information that is current and information that is merely persistent.',
    tags: ['reston', 'skill', 'analysis'],
    passiveBonus: '+1 when you identify which data is still live and which is an echo.',
  },
  {
    id: 'card-skill-reston-version-control',
    kind: 'skill',
    title: 'Version Control',
    description:
      'You track how a document or decision diverged and can explain the moment the fork happened.',
    tags: ['reston', 'skill', 'records'],
    passiveBonus: '+1 when reconciling two versions of the same story.',
  },
  {
    id: 'card-skill-reston-knowledge-cartographer',
    kind: 'skill',
    title: 'Knowledge Cartographer',
    description:
      'You map what people know, not just what they do. You find the experts nobody thinks to ask.',
    tags: ['reston', 'skill', 'knowledge'],
    passiveBonus: '+1 when you identify who holds undocumented knowledge.',
  },
  {
    id: 'card-skill-ashburn-capacity-planner',
    kind: 'skill',
    title: 'Capacity Planner',
    description:
      'You think in power, cooling, and rack units before thinking in features. Every migration starts with a physical constraint.',
    tags: ['ashburn', 'skill', 'infrastructure'],
    passiveBonus: '+1 when you account for physical infrastructure in a plan.',
  },
  {
    id: 'card-skill-ashburn-dependency-tracer',
    kind: 'skill',
    title: 'Dependency Tracer',
    description:
      'You can trace any service call from origin to destination and name every hop in between.',
    tags: ['ashburn', 'skill', 'debugging'],
    passiveBonus: '+1 when you map hidden dependencies in a system.',
  },
  {
    id: 'card-skill-ashburn-schema-diplomat',
    kind: 'skill',
    title: 'Schema Diplomat',
    description:
      'You mediate between teams that share data but disagree on structure. Your solutions involve boundaries, not winners.',
    tags: ['ashburn', 'skill', 'data'],
    passiveBonus: '+1 when reconciling competing data models or interfaces.',
  },
  {
    id: 'card-skill-ashburn-latency-hunter',
    kind: 'skill',
    title: 'Latency Hunter',
    description:
      'You feel the milliseconds. When something slows down, you know how to trace the path until you find the unexpected hop.',
    tags: ['ashburn', 'skill', 'performance'],
    passiveBonus: '+1 when diagnosing performance issues or hidden system costs.',
  },
  {
    id: 'card-skill-inspect-system',
    kind: 'skill',
    title: 'Inspect the System',
    description:
      'Before acting, peek one layer deeper: incentives, constraints, or invisible interfaces.',
    tags: ['skill', 'analysis'],
    passiveBonus: '+1 to understanding complex or opaque systems.',
  },
  {
    id: 'card-skill-rapid-prototype',
    kind: 'skill',
    title: 'Rapid Prototype',
    description:
      'Sketch a small, reversible experiment instead of committing the entire realm to a path.',
    tags: ['skill', 'experiments'],
    passiveBonus: '+1 when proposing safe-to-fail experiments.',
  },

  // Insight cards (one-time boosts)
  {
    id: 'card-insight-name-pattern',
    kind: 'insight',
    title: 'Name the Pattern',
    description:
      'Give a repeating dynamic a memorable name so everyone can point at it without blame.',
    tags: ['insight', 'patterns'],
    oneTimeEffect: '+2 to a roll when you call out a recurring pattern in the fiction.',
  },
  {
    id: 'card-insight-local-legend',
    kind: 'insight',
    title: 'Local Legend',
    description:
      'Tell a short story from a neighboring realm that hints at how this one might evolve.',
    tags: ['insight', 'story'],
    oneTimeEffect: '+2 when you anchor a decision in a story rather than a metric.',
  },
  {
    id: 'card-insight-second-chance',
    kind: 'insight',
    title: 'Second Chance',
    description:
      'You have learned when to pause, recalibrate, and try again instead of doubling down.',
    tags: ['insight', 'resilience'],
    oneTimeEffect: '+2 to your next quest roll. Use when the first attempt did not land.',
  },
  {
    id: 'card-insight-quiet-signal',
    kind: 'insight',
    title: 'The Quiet Signal',
    description:
      'The most valuable information often travels through unofficial channels. You know where to find it and how to protect the source.',
    tags: ['tysons', 'insight', 'intelligence'],
    oneTimeEffect: '+2 when you act on information from outside the official reporting chain.',
  },
  {
    id: 'card-insight-goodharts-ghost',
    kind: 'insight',
    title: "Goodhart's Ghost",
    description:
      'When a measure becomes a target, it ceases to be a good measure. You can see this happening in real time.',
    tags: ['tysons', 'insight', 'metrics'],
    oneTimeEffect: '+2 when you identify a metric that has been gamed into meaninglessness.',
  },
  {
    id: 'card-insight-infrastructure-debt',
    kind: 'insight',
    title: 'Infrastructure Debt',
    description:
      'You recognize that the oldest systems are the most trusted precisely because nobody dares to change them. That trust is a kind of debt.',
    tags: ['ashburn', 'insight', 'systems'],
    oneTimeEffect: '+2 when you argue for updating a system that everyone relies on but nobody maintains.',
  },
  {
    id: 'card-insight-silent-contract',
    kind: 'insight',
    title: 'The Silent Contract',
    description:
      'Every handshake between systems implies a contract that nobody signed. You can read the contract from the behavior.',
    tags: ['ashburn', 'insight', 'integration'],
    oneTimeEffect: '+2 when you make an implicit system dependency explicit.',
  },
  {
    id: 'card-insight-institutional-ghost',
    kind: 'insight',
    title: 'Institutional Ghost',
    description:
      'You noticed something that everyone feels but nobody names: the organization is haunted by decisions it cannot remember making.',
    tags: ['reston', 'insight', 'memory'],
    oneTimeEffect: '+2 when you invoke a historical pattern to explain a present problem.',
  },
  {
    id: 'card-insight-selective-amnesia',
    kind: 'insight',
    title: 'Selective Amnesia',
    description:
      'Sometimes the healthiest thing an institution can do is forget. You know which memories to keep and which to release.',
    tags: ['reston', 'insight', 'wisdom'],
    oneTimeEffect: '+2 when you argue for letting go of something the organization is clinging to.',
  },
]

/** Max bonus from skills. Prevents runaway modifiers in late game. */
const MAX_SKILL_BONUS = 3

export function getSkillBonusForUnlocked(unlockedCardIds: string[]): number {
  const count = cards.filter(
    (c) => c.kind === 'skill' && unlockedCardIds.includes(c.id),
  ).length
  return Math.min(count, MAX_SKILL_BONUS)
}

export function getQuestCardFor(questId: QuestId, regionId: RegionId): QuestCard | undefined {
  return cards.find(
    (c): c is QuestCard => c.kind === 'quest' && c.questId === questId && c.regionId === regionId,
  )
}

export function getDefaultHandForEncounter(
  questId: QuestId,
  regionId: RegionId,
  unlockedCardIds: string[],
  availableInsightIds: string[],
): Card[] {
  const hand: Card[] = []

  const questCard = getQuestCardFor(questId, regionId)
  if (questCard) {
    hand.push(questCard)
  }

  const regionDialogueMap: Partial<Record<RegionId, string>> = {
    arlington: 'card-dialogue-arlington-clarifying-question',
    reston: 'card-dialogue-reston-read-the-room',
    tysons: 'card-dialogue-tysons-slow-question',
    ashburn: 'card-dialogue-ashburn-trace-the-wire',
  }
  const regionDialogueId = regionDialogueMap[regionId]
  const regionDialogue =
    regionDialogueId && unlockedCardIds.includes(regionDialogueId)
      ? cards.find((c) => c.id === regionDialogueId)
      : null
  const fallbackDialogue = cards.find((c) => c.id === 'card-dialogue-open-channel')
  const dialogueCard = regionDialogue ?? fallbackDialogue
  if (dialogueCard) {
    hand.push(dialogueCard)
  }

  const unlockedSkills = cards.filter(
    (c) => c.kind === 'skill' && unlockedCardIds.includes(c.id),
  )
  for (const skill of unlockedSkills.slice(0, 3)) {
    hand.push(skill)
  }

  const insightCard = cards.find(
    (c) => c.kind === 'insight' && availableInsightIds.includes(c.id),
  )
  if (insightCard) {
    hand.push(insightCard)
  }

  return hand.slice(0, 5)
}

