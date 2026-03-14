import type { LoreEntry } from '../types'

export const lore: LoreEntry[] = [
  // Arlington
  {
    id: 'lore-arlington-analyst',
    title: 'The Analyst as Infrastructure',
    body:
      'In Arlington, the most critical systems often run through a single person. Their inbox, their memory, their willingness to stay late—these become load-bearing. The org chart does not reflect it. The analyst knows. They have learned to survive by being indispensable, which is another word for trapped.',
    footnote: 'The first handoff is always the hardest. After that, the system remembers.',
  },
  {
    id: 'lore-arlington-consultants',
    title: 'The Consultant Circle',
    body:
      'Four firms orbit the same problem. Each has a deck. Each has a methodology. None has spoken to the people who run the systems. The circle meets monthly, refines the taxonomy, and produces artifacts that satisfy the contract. The work that would change anything never makes it onto the slide.',
    footnote: 'The circle will continue until someone asks: who is not in the room?',
  },
  {
    id: 'lore-arlington-stakeholder',
    title: 'The Invisible They',
    body:
      'Every approval chain has a bottleneck. Often it is a person whose name does not appear on the org chart, the calendar, or the RACI. They are "they." They are "we need to check with." Finding them is half the work. Inviting them in without making them the villain is the other half.',
  },
  {
    id: 'lore-arlington-engine',
    title: 'The Alignment Engine',
    body:
      'In a basement lab, someone built a machine that ranks requirements, roadmaps, and people. It ingests documents and outputs winners. The question is not whether it works—it does. The question is what it optimizes for. Left to its defaults, it will encode every bias and blind spot of the people who fed it. Tuned with care, it can quietly reward the work that connects instead of competes.',
    footnote: 'The Engine does not decide. It amplifies.',
  },
  // Reston
  {
    id: 'lore-reston-phantom-standup',
    title: 'Meetings That Outlive Themselves',
    body:
      'The Reston Node runs on inherited rhythms. A daily standup was once the heartbeat of three teams: fifteen minutes, three questions, done. Then a reorg split the teams, but nobody killed the invite. The meeting died on the calendar but kept living in people\'s habits. They still check in mentally at 9:15. They still defer decisions by saying "let\'s bring it up tomorrow." The standup became a ghost protocol\u2014invisible, unaccountable, and load-bearing.',
    footnote: 'The most powerful meetings are the ones nobody attends.',
  },
  {
    id: 'lore-reston-forked-record',
    title: 'Two Truths and a Budget',
    body:
      'It started innocently: one department copied the master spreadsheet to add a column. Then they corrected a date. Then they "fixed" a number that had been wrong for years\u2014except it wasn\'t wrong, it was a convention. Now two records coexist, each internally consistent, each used to justify different budget lines. People who notice the discrepancy learn to ask "which version?" in a tone that implies they already know the answer.',
    footnote: 'A fork is only a problem if you expected a single source of truth.',
  },
  {
    id: 'lore-reston-retention-cliff',
    title: 'The Quiet Departures',
    body:
      'The people leaving are not announcing it. They are not slamming doors. They are updating their documentation\u2014carefully, almost lovingly\u2014and walking out. The teams left behind will discover, in three months, that the documentation explains what but not why. The "why" lived in hallway conversations, in lunch-break stories, in the way someone squinted at a dashboard and said "that number looks off." That knowledge is now in a different zip code.',
  },
  {
    id: 'lore-reston-memory-palace',
    title: 'The Palace That Cannot Forget',
    body:
      'The Memory Palace was built to solve a real problem: institutional amnesia. Every reorg erased lessons. Every leadership change reset priorities. The Palace would remember. It indexes every after-action report, every lessons-learned document, every post-mortem. The problem is that it treats a 2019 security incident and a 2024 cloud migration as equally relevant. It generates policies for threats that no longer exist and org structures that dissolved years ago. The Palace remembers everything, which means it cannot tell you what matters now.',
    footnote: 'Memory without judgment is just storage.',
  },
  // Tysons
  {
    id: 'lore-tysons-metric-mirage',
    title: 'The Green Dashboard Problem',
    body:
      'In the Spires, a green dashboard does not mean things are going well. It means someone chose thresholds that are easy to meet. The real question is never "is the number green?" but "what would have to be true for this number to turn red?" If the answer is "nothing realistic," you are looking at a mirage.',
    footnote: 'A metric that cannot fail is not a metric. It is decoration.',
  },
  {
    id: 'lore-tysons-elevator-pitch',
    title: 'Thirty Seconds of Gravity',
    body:
      'The Spires are tall enough that an elevator ride between floors lasts exactly thirty seconds. This is not a coincidence. The architects calibrated for pitch culture: any idea that cannot survive thirty seconds of gravity does not deserve a floor. The problem is that some of the most important work\u2014care, maintenance, integration\u2014cannot be compressed into a pitch. It can only be demonstrated over time.',
    footnote: 'The elevator does not care about your nuance.',
  },
  {
    id: 'lore-tysons-dashboard',
    title: 'Four Hundred Metrics and Counting',
    body:
      'The Dashboard of Dashboards was meant to end the reporting wars. Instead, every team lobbied to include their preferred metric. The result: a screen so dense with indicators that it takes longer to read than to just walk the floors and ask people how things are going. Leadership stares at it in weekly reviews, nods thoughtfully, and makes decisions based on gut feel anyway. But the dashboard persists, because it proves that someone looked.',
  },
  {
    id: 'lore-tysons-prediction-market',
    title: 'The Market That Knows',
    body:
      'Nobody remembers who started the prediction market. It runs on an internal tool that was supposed to be for hackathon voting. Employees bet virtual tokens on whether projects will ship on time, whether reorgs will happen, and whether the quarterly numbers will match the forecast. The market is right more often than the official planning process, which is why nobody in planning wants to talk about it. The market does not lie because it has no reason to.',
    footnote: 'The truth is cheap when there is nothing to gain from hiding it.',
  },
  // Ashburn
  {
    id: 'lore-ashburn-cold-start',
    title: 'The Empty Hall',
    body:
      'A new wing of the Dominion opens and it smells like concrete and packing material. Three teams arrive on the same day with three different plans, each assuming they were first in line. The hall has power, cooling, and fiber\u2014everything except an agreement on who goes where. In Ashburn, space is not the constraint. Agreement is.',
    footnote: 'The first workload to land defines the culture of the hall.',
  },
  {
    id: 'lore-ashburn-schema-dispute',
    title: 'The Table That Two Teams Share',
    body:
      'It started as a convenience: two vendor teams writing to the same database to avoid an integration layer. One team normalizes obsessively because their analysts need clean joins. The other denormalizes for speed because their service has a 50ms SLA. The nightly batch job where their assumptions collide has become the most fragile component in the Dominion\u2014a 3am process that takes 45 minutes when it works and four hours when it does not.',
    footnote: 'Shared tables are shared trust. When the trust diverges, the table breaks.',
  },
  {
    id: 'lore-ashburn-latency-tax',
    title: 'The Four Milliseconds Nobody Noticed',
    body:
      'The original path from Tysons to the Ashburn service was 4ms. Clean, fast, well-documented. Then someone added a logging layer for an audit that ended two years ago. The layer added 36ms, which is an eternity in systems time but invisible in meeting time. Users complained; engineers shrugged; the logging layer kept writing to a database nobody reads. The latency tax is not malicious. It is the residue of a reasonable decision whose context expired.',
  },
  {
    id: 'lore-ashburn-vault-keeper',
    title: 'The Keeper in the Dark',
    body:
      'The Vault Keeper was state of the art in 2018. It applies retention rules to every object in cold storage: keep for seven years, archive for three, recycle after one. The rules were written for a regulatory environment that has since changed, a data volume that has since tripled, and a cost model that has since inverted. Nobody has updated the rules because the Keeper runs on credentials that three people once shared and all three have since left the organization. The Keeper does not know this. It follows its rules faithfully, in the dark, doing exactly what it was told.',
    footnote: 'Automation without review is not reliability. It is momentum.',
  },
  // Other regions
  {
    id: 'lore-vault-origins',
    title: 'Origins of the Ashburn Vault',
    body:
      'Before the Beltway Realms were neatly named, a coalition of librarians and network engineers built a cold archive in the fields west of the river. They believed that every schema deserved a quiet place to sleep, even if adoption never came. Over time the vault accreted forgotten formats, orphaned APIs, and aborted migration plans—an underlayer of unrealized futures humming beneath the present.',
    footnote: 'The vault’s maintenance schedule is older than several existing jurisdictions.',
  },
  {
    id: 'lore-arrival-protocols',
    title: 'Official and Unofficial Arrival Protocols',
    body:
      'Herndon Gate maintains a published list of arrival protocols, but the real handshakes travel by rumor. Crews arriving from distant shards trade notes on which acronyms to respect, which titles to ignore, and which questions to never answer with a number. The customs hall is where foreign realities first learn how the Beltway speaks about itself.',
  },
  {
    id: 'lore-meeting-rooms',
    title: 'The Rooms That Remember',
    body:
      'Certain conference rooms in the Reston Node are said to “remember” conversations long after calendars forget them. The superstition began when a whiteboard reconstituted erased diagrams after a lightning storm. Now, teams book specific rooms when they want a decision to persist beyond the next reorg, or to disappear as if it never left someone’s notebook.',
  },
  {
    id: 'lore-skyline-grid',
    title: 'The Skyline Sensor Grid',
    body:
      'What began as a mundane traffic-monitoring contract at Tysons Spires evolved into a sky-level sensor grid pieced together by telecoms, advertisers, and amateur weather guilds. Every new device added a slightly different view of the same people moving below, until someone asked the obvious question: what story emerges when you blend all of these perspectives together?',
  },
  {
    id: 'lore-beltway-charter',
    title: 'The Beltway Charter',
    body:
      'The Charter is less a single document and more a family of drafts that refuse to converge. Each revision tries to define which realms are “inside” and which are “adjacent,” but every decade reveals new edges—co-working collectives, encrypted co-ops, temporary festivals—that blur the map. The Summit’s true work is not ratifying text, but deciding who will be invited to argue over the next draft.',
  },
]

export function getLoreById(id: string | undefined | null) {
  if (!id) return undefined
  return lore.find((entry) => entry.id === id)
}

