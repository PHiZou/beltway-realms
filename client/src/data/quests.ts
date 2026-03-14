import type { Quest } from '../types'

export const quests: Quest[] = [
  {
    id: 'arlington-overloaded-analyst',
    regionId: 'arlington',
    title: 'The Overloaded Analyst',
    summary:
      'An analyst at the Arlington Nexus is the only person who seems to know how three legacy dashboards fit together. Their inbox has become a production system.',
    objective:
      'Map what the analyst is really doing and design a first small handoff that does not break trust.',
    stakes:
      'If the analyst burns out or leaves, the work disappears into tickets and folklore. If you help, you may see the shape of the larger fragmentation.',
    recommendedCards: ['quest', 'dialogue', 'skill'],
    loreId: 'lore-arlington-analyst',
  },
  {
    id: 'arlington-consultant-circle',
    regionId: 'arlington',
    title: 'The Consultant Circle',
    summary:
      'Four consulting teams trade slide decks in a glass conference room, each convinced they own the problem. Nobody has spoken to the people running the systems.',
    objective:
      'Align the circle around a shared question worth answering and a single definition of “done” that involves actual operators.',
    stakes:
      'Left alone, the circle will calcify into a permanent governance ritual that generates artifacts instead of outcomes.',
    recommendedCards: ['dialogue', 'insight'],
    loreId: 'lore-arlington-consultants',
  },
  {
    id: 'arlington-invisible-stakeholder',
    regionId: 'arlington',
    title: 'The Invisible Stakeholder',
    summary:
      'Every meeting ends with “we’ll have to see what they say,” but nobody can name who “they” are. Calendars and org charts disagree.',
    objective:
      'Trace the decision path until you find the real stakeholder, then invite them into the story in a way that feels safe.',
    stakes:
      'If the invisible stakeholder stays invisible, every alignment you achieve will be reversible and brittle.',
    recommendedCards: ['quest', 'insight', 'skill'],
    loreId: 'lore-arlington-stakeholder',
  },
  {
    id: 'arlington-alignment-engine',
    regionId: 'arlington',
    title: 'Boss: The Alignment Engine',
    summary:
      'In a secure basement lab, the organization has built an “Alignment Engine” that ingests requirements and outputs rankings, roadmaps, and winners.',
    objective:
      'Decide what the Alignment Engine should optimize for—and what it must ignore—so that fragmented efforts begin to converge instead of compete.',
    stakes:
      'Left unchecked, the Engine will encode today’s misunderstandings into tomorrow’s incentives. Tuned well, it can quietly reward the people who already behave like stewards.',
    recommendedCards: ['quest', 'dialogue', 'insight'],
    loreId: 'lore-arlington-engine',
  },
  {
    id: 'data-vault-awakening',
    regionId: 'ashburn',
    title: 'The Data Vault Awakening',
    summary:
      'A dormant cluster in the Ashburn Dominion flickers back online, broadcasting a centuries-overdue status report.',
    objective: 'Trace the reawakened data-vault and decide who receives its contents.',
    stakes:
      'The vault may contain the original schema for the Beltway Realms itself—altering it could rewrite jurisdictional reality.',
    recommendedCards: ['quest', 'insight', 'skill'],
    loreId: 'lore-vault-origins',
  },
  {
    id: 'ashburn-cold-start',
    regionId: 'ashburn',
    title: 'The Cold Start Problem',
    summary:
      'A new data center wing is online, but nobody can agree on what workloads should run there first. Three teams have competing migration plans, each with dependencies the others do not acknowledge.',
    objective:
      'Facilitate a migration priority that accounts for all three dependencies without letting any team claim the space as their own.',
    stakes:
      'If one team colonizes the new capacity, the other two will build parallel infrastructure and Ashburn will have three half-empty halls instead of one that works.',
    recommendedCards: ['quest', 'dialogue', 'skill'],
    loreId: 'lore-ashburn-cold-start',
  },
  {
    id: 'ashburn-schema-dispute',
    regionId: 'ashburn',
    title: 'The Schema Dispute',
    summary:
      'Two vendor teams share a database but disagree on the schema. One wants normalization; the other wants performance. The nightly batch jobs are starting to collide.',
    objective:
      'Broker a schema agreement that acknowledges both teams\' needs, or design a boundary that lets them diverge without breaking each other.',
    stakes:
      'If the schema fight escalates, one team will fork the database and Ashburn will have two sources of truth for the same operational data.',
    recommendedCards: ['quest', 'skill', 'insight'],
    loreId: 'lore-ashburn-schema-dispute',
  },
  {
    id: 'ashburn-latency-tax',
    regionId: 'ashburn',
    title: 'The Latency Tax',
    summary:
      'A critical service path routes through Ashburn even though most of its users are in Tysons. The 4ms round-trip became 40ms when someone added a logging layer nobody remembers approving.',
    objective:
      'Trace the latency spike to its source and decide whether to remove the rogue layer, relocate it, or make its cost transparent.',
    stakes:
      'If the latency tax persists, teams will build workarounds that add more hops. If you remove it carelessly, you lose the audit trail it was silently providing.',
    recommendedCards: ['dialogue', 'skill', 'insight'],
    loreId: 'lore-ashburn-latency-tax',
  },
  {
    id: 'ashburn-vault-keeper',
    regionId: 'ashburn',
    title: 'Boss: The Vault Keeper',
    summary:
      'Deep in the oldest hall of the Dominion lives the Vault Keeper: an automated system that decides what data is worth keeping and what gets recycled. It has been running on its original rules for eight years. Nobody has reviewed them because nobody has the credentials.',
    objective:
      'Gain access to the Vault Keeper\u2019s retention rules and update them so they reflect current value, not 2018 assumptions about what mattered.',
    stakes:
      'A Vault Keeper running on stale rules will eventually recycle something irreplaceable or, worse, preserve everything until the halls run out of power and budget.',
    recommendedCards: ['quest', 'dialogue', 'insight'],
    loreId: 'lore-ashburn-vault-keeper',
  },
  {
    id: 'herndon-gate-handshake',
    regionId: 'herndon',
    title: 'The Herndon Gate Handshake',
    summary:
      'A diplomatic envoy from an off-beltway shard arrives, but their encryption standard predates local memory.',
    objective: 'Negotiate a shared protocol before their visas and patience expire.',
    stakes:
      'If talks collapse, their shard may route around the Beltway entirely, siphoning trade and talent through unknown channels.',
    recommendedCards: ['dialogue', 'insight'],
    loreId: 'lore-arrival-protocols',
  },
  {
    id: 'reston-node-echoes',
    regionId: 'reston',
    title: 'Echoes in the Reston Node',
    summary:
      'Campus servers begin replaying conversations from meetings that never officially occurred.',
    objective: 'Follow the phantom recordings to the incident origin and decide what becomes part of the permanent record.',
    stakes:
      'The echoes implicate no one and everyone. Choosing which memories to keep will shape hiring, funding, and forgotten debts.',
    recommendedCards: ['insight', 'quest'],
    loreId: 'lore-meeting-rooms',
  },
  {
    id: 'reston-phantom-standup',
    regionId: 'reston',
    title: 'The Phantom Standup',
    summary:
      'Every team references a daily standup whose decisions still drive priorities, but the meeting itself stopped running months ago. Nobody remembers canceling it.',
    objective:
      'Trace who is still acting on phantom-standup decisions and decide whether to revive the ritual, replace it, or make the ghost official.',
    stakes:
      'If the phantom standup keeps running in people\'s heads, nobody can tell the difference between current direction and inherited momentum.',
    recommendedCards: ['quest', 'dialogue', 'skill'],
    loreId: 'lore-reston-phantom-standup',
  },
  {
    id: 'reston-forked-record',
    regionId: 'reston',
    title: 'The Forked Record',
    summary:
      'Two departments maintain competing versions of the same historical record. Each claims theirs is canonical. Budget decisions flow from whichever version the requester happens to find first.',
    objective:
      'Reconcile the two forks into a single record, or make the split intentional and transparent so people stop accidentally using the wrong one.',
    stakes:
      'Unchecked, the fork will keep widening until the two departments are governing different realities with the same name.',
    recommendedCards: ['quest', 'insight', 'skill'],
    loreId: 'lore-reston-forked-record',
  },
  {
    id: 'reston-retention-cliff',
    regionId: 'reston',
    title: 'The Retention Cliff',
    summary:
      'A wave of departures has begun. The people leaving are not the loudest, but they are the ones who remember why certain systems were built the way they are.',
    objective:
      'Capture enough context before the departures to keep the Node from losing its ability to explain itself to its future self.',
    stakes:
      'If the knowledge walks out the door, what remains is process without purpose: a campus that runs meetings about meetings about the thing nobody remembers building.',
    recommendedCards: ['dialogue', 'insight', 'skill'],
    loreId: 'lore-reston-retention-cliff',
  },
  {
    id: 'reston-memory-palace',
    regionId: 'reston',
    title: 'Boss: The Memory Palace',
    summary:
      'Deep in the Reston Node sits the Memory Palace: a vast repository that auto-generates policies from historical patterns. It remembers everything, and it forgets nothing, which turns out to be a problem.',
    objective:
      'Teach the Memory Palace what to let go of and what to preserve, so it stops generating policies for situations that no longer exist.',
    stakes:
      'A Memory Palace that cannot forget will drown the present under the weight of every past decision. One that forgets too easily will repeat every mistake.',
    recommendedCards: ['quest', 'dialogue', 'insight'],
    loreId: 'lore-reston-memory-palace',
  },
  {
    id: 'tysons-spires-overwatch',
    regionId: 'tysons',
    title: 'Overwatch from the Spires',
    summary:
      'A rooftop array of cameras and sensors begins tagging people with visible “future roles.” Some embrace the labels, others revolt.',
    objective: 'Audit the prediction model from the street level up to the observation deck.',
    stakes:
      'If the tags are accurate, you are glimpsing a self-fulfilling prophecy engine. If they are not, someone is writing futures for profit.',
    recommendedCards: ['skill', 'dialogue'],
    loreId: 'lore-skyline-grid',
  },
  {
    id: 'tysons-metric-mirage',
    regionId: 'tysons',
    title: 'The Metric Mirage',
    summary:
      'Every floor of the Spires reports green dashboards, but the street-level reality feels red. Someone is optimizing for the number, not the thing the number was supposed to measure.',
    objective:
      'Find where the metric diverged from reality and propose a measurement that reflects what actually matters.',
    stakes:
      'If the mirage persists, decision-makers will keep funding the dashboard while the real system deteriorates behind it.',
    recommendedCards: ['quest', 'skill', 'dialogue'],
    loreId: 'lore-tysons-metric-mirage',
  },
  {
    id: 'tysons-elevator-pitch',
    regionId: 'tysons',
    title: 'The Elevator Pitch',
    summary:
      'In the Spires, you have thirty seconds between floors to convince someone your work matters. The problem: everyone has learned to pitch but nobody has learned to listen.',
    objective:
      'Break through the pitch culture by asking a question so good that the elevator stops feeling like a sales floor.',
    stakes:
      'If the pitch culture wins, the Spires will fund whatever sounds best in thirty seconds and starve whatever requires explanation.',
    recommendedCards: ['dialogue', 'insight'],
    loreId: 'lore-tysons-elevator-pitch',
  },
  {
    id: 'tysons-dashboard-of-dashboards',
    regionId: 'tysons',
    title: 'The Dashboard of Dashboards',
    summary:
      'Leadership commissioned a master dashboard that aggregates all other dashboards. It now shows 400 metrics, none of which agree, and nobody can find the "so what."',
    objective:
      'Reduce the Dashboard of Dashboards to the five metrics that would actually change a decision if they moved.',
    stakes:
      'If the mega-dashboard survives as-is, it becomes proof that leadership looked at data while making no data-driven decisions.',
    recommendedCards: ['quest', 'skill', 'insight'],
    loreId: 'lore-tysons-dashboard',
  },
  {
    id: 'tysons-prediction-market',
    regionId: 'tysons',
    title: 'Boss: The Prediction Market',
    summary:
      'The top floor of the tallest Spire runs a prediction market where employees bet on project outcomes. It is more accurate than any official forecast, which makes official forecasters very nervous.',
    objective:
      'Decide whether the prediction market should replace, supplement, or be shut down alongside the official forecasting process.',
    stakes:
      'The market knows things the org chart cannot admit. Shutting it down kills the signal. Elevating it threatens everyone whose job is to predict.',
    recommendedCards: ['quest', 'dialogue', 'insight'],
    loreId: 'lore-tysons-prediction-market',
  },
  {
    id: 'citadel-summit',
    regionId: 'citadel',
    title: 'The Citadel Summit',
    summary:
      'Delegates from every realm converge to decide which realities receive official recognition—and which remain “beta.”',
    objective:
      'Carry stories from the outer regions into the inner council and negotiate which worlds remain canon.',
    stakes:
      'Entire neighborhoods may be deprecated to unsupported status if they fail to convince the summit they matter.',
    recommendedCards: ['quest', 'dialogue', 'insight'],
    loreId: 'lore-beltway-charter',
  },
]

export function getQuestById(id: string | undefined | null) {
  if (!id) return undefined
  return quests.find((q) => q.id === id)
}

