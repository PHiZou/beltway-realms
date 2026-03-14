import type { Region } from '../types'

export const regions: Region[] = [
  {
    id: 'ashburn',
    name: 'Ashburn Data Dominion',
    tagline: 'Where infrastructure is invisible until it breaks, and the people who maintain it are invisible always.',
    flavor:
      'Low windowless buildings stretch along roads that look like nothing. Inside, the backbone of the modern world hums at 68 degrees Fahrenheit. The engineers who keep it running know every cable path and every failure mode, but their work only becomes visible during outages. Ashburn rewards the patient, the precise, and the people who understand that reliability is a practice, not a state.',
    mapLabel: 'Ashburn Data Dominion',
    defaultQuestId: 'ashburn-cold-start',
    questIds: [
      'ashburn-cold-start',
      'ashburn-schema-dispute',
      'ashburn-latency-tax',
      'ashburn-vault-keeper',
    ],
    fullPlayable: true,
    prerequisiteRegionId: 'tysons',
  },
  {
    id: 'herndon',
    name: 'Herndon Gate',
    tagline: 'An arrival point where caravans of code clear customs.',
    flavor:
      'Couriers disembark from sky-trams clutching briefcases of encrypted contracts. The air tastes of jet fuel and ionized paperwork.',
    mapLabel: 'Herndon Gate',
    defaultQuestId: 'herndon-gate-handshake',
    questIds: ['herndon-gate-handshake'],
  },
  {
    id: 'reston',
    name: 'Reston Node',
    tagline: 'Where institutional memory decides what the future is allowed to know.',
    flavor:
      'Low towers reflect off still water, each floor another jurisdiction. Bridges double as load balancers for foot traffic and secrets. Here the question is never "what happened?" but "whose version of what happened gets to persist?"',
    mapLabel: 'Reston Node',
    defaultQuestId: 'reston-phantom-standup',
    questIds: [
      'reston-phantom-standup',
      'reston-forked-record',
      'reston-retention-cliff',
      'reston-memory-palace',
    ],
    fullPlayable: true,
    prerequisiteRegionId: 'arlington',
  },
  {
    id: 'tysons',
    name: 'Tysons Spires',
    tagline: 'Where performance metrics replace reality until nobody can tell the difference.',
    flavor:
      'Glass towers stack vertically like a spreadsheet made physical. Every floor has its own dashboard, its own definition of success, its own story about why the numbers look the way they do. The Spires reward what gets measured and quietly destroy what does not.',
    mapLabel: 'Tysons Spires',
    defaultQuestId: 'tysons-metric-mirage',
    questIds: [
      'tysons-metric-mirage',
      'tysons-elevator-pitch',
      'tysons-dashboard-of-dashboards',
      'tysons-prediction-market',
    ],
    fullPlayable: true,
    prerequisiteRegionId: 'reston',
  },
  {
    id: 'arlington',
    name: 'Arlington Nexus',
    tagline: 'First contact with the Beltway: busy, capable, and misaligned.',
    flavor:
      'Arlington is where early-career practitioners first learn the Beltway’s favorite trick: align a dozen half-compatible systems just enough to ship something. Cubes, coffee lines, and secure basements all hum with good intentions that rarely point in the same direction.',
    mapLabel: 'Arlington Nexus',
    defaultQuestId: 'arlington-overloaded-analyst',
    questIds: [
      'arlington-overloaded-analyst',
      'arlington-consultant-circle',
      'arlington-invisible-stakeholder',
      'arlington-alignment-engine',
    ],
    fullPlayable: true,
  },
  {
    id: 'pentagon',
    name: 'Pentagon Bastion',
    tagline: 'A five-sided fortress casting long policy shadows.',
    flavor:
      'Exterior corridors loop like a protection sigil. Inside, war-rooms glow with projections of possible tomorrows, each annotated in red.',
    mapLabel: 'Pentagon Bastion',
    defaultQuestId: 'citadel-summit',
    questIds: ['citadel-summit'],
  },
  {
    id: 'citadel',
    name: 'The Citadel (D.C.)',
    tagline: 'A capital built on overlapping reality layers.',
    flavor:
      'Monuments anchor the physical realm while invisible committees draft rules for the worlds behind login prompts and visitor badges.',
    mapLabel: 'The Citadel (D.C.)',
    defaultQuestId: 'citadel-summit',
    questIds: ['citadel-summit'],
  },
  {
    id: 'alexandria',
    name: 'Alexandria Archives',
    tagline: 'Riverside stacks of analog and digital memory.',
    flavor:
      'Cobblestone streets overlay fiber conduits. In repurposed warehouses, archivists barcode the past while rogue historians fork the record.',
    mapLabel: 'Alexandria Archives',
    defaultQuestId: 'reston-node-echoes',
    questIds: ['reston-node-echoes'],
  },
]

export function getRegionById(id: string | undefined | null) {
  if (!id) return undefined
  return regions.find((r) => r.id === id)
}

