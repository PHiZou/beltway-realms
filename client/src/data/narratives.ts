import type { QuestId } from '../types'
import type { DiceOutcomeTier } from '../rules/dice'

type OutcomeNarratives = Record<DiceOutcomeTier, string>

const arlingtonNarratives: Record<string, OutcomeNarratives> = {
  'arlington-overloaded-analyst': {
    critical:
      `The analyst exhales for the first time in months. Your sketch of their actual workflow becomes a shared artifact the team pins to their wall. Two handoffs happen that afternoon.`,
    success:
      `You map the flow clearly enough that someone else volunteers to own a piece. The analyst is cautious but willing. One handoff sticks; the other needs a second try.`,
    mixed:
      `Your map is accurate but reveals more fragmentation than anyone expected. The analyst feels exposed. You gain clarity, but the team now knows how fragile things are.`,
    failure:
      `The analyst does not trust the process yet and reverts to doing everything themselves. But you noticed a pattern: three different teams send them the same request in different formats.`,
  },
  'arlington-consultant-circle': {
    critical:
      `The four firms pause mid-slide, and you redirect the room toward a single question: "What would the operators need to see to believe this is real?" The room goes quiet, then productive.`,
    success:
      `You get two of the four firms to converge on a shared definition of "done." The other two agree to observe. Operators are invited to the next meeting.`,
    mixed:
      `One firm breaks rank and actually talks to operators, but the others treat that as a breach of process. You made progress, but the circle now has a faction.`,
    failure:
      `The circle produces another artifact. But in the hallway afterward, one consultant confides: "I know this is theater. I just can\u2019t say it in there." You now have an ally who cannot act publicly.`,
  },
  'arlington-invisible-stakeholder': {
    critical:
      `You find the stakeholder: a deputy three levels removed who has been signing off on everything without reading it. When you brief them properly, they cancel two projects and fund the one that matters.`,
    success:
      `The stakeholder agrees to attend one meeting. They are visibly surprised by how much has been decided in their name. Small corrections follow; the biggest misunderstanding is cleared.`,
    mixed:
      `You identify the stakeholder but they decline the meeting. They send a delegate who takes notes but commits to nothing. Still, you now know who "they" are, and so does everyone else.`,
    failure:
      `The approvals chain leads to a shared inbox that three people monitor but nobody owns. The invisible stakeholder is not a person\u2014it is a gap. Knowing this changes how you frame the next request.`,
  },
  'arlington-alignment-engine': {
    critical:
      `You reconfigure the Engine\u2019s reward function to weight connective work\u2014handoffs completed, stakeholders briefed, shared definitions adopted. Within a week, three fragmented teams start showing up to each other\u2019s standups.`,
    success:
      `The Engine now penalizes solo-hero metrics and gives modest credit for boundary-crossing. Not everyone agrees, but the incentive gradient has shifted. Fragmentation begins to slow.`,
    mixed:
      `You improve the Engine, but a faction lobbies to add their own metrics, diluting the signal. The Engine is better than before, but it now optimizes for consensus rather than connection. Close, not perfect.`,
    failure:
      `The Engine resists your changes\u2014or rather, the people who built it do. But you documented how the current reward function amplifies fragmentation, and that document starts circulating. The next person who tries will have a clearer map.`,
  },
}

const restonNarratives: Record<string, OutcomeNarratives> = {
  'reston-phantom-standup': {
    critical:
      `You trace every phantom decision back to its source and present the team with a clean timeline. They are stunned by how much they inherited without questioning. The standup is reborn\u2014three minutes, one question, real accountability.`,
    success:
      `You identify the core three people still running on phantom-standup logic and get them into a room. They agree to either restart or formally close it. Two of the three ghost decisions get replaced with real ones.`,
    mixed:
      `You surface the phantom standup, but the team is divided: half want to revive it, half say the ghost version works fine. You leave with awareness but not consensus. The ritual continues, now semi-visible.`,
    failure:
      `The team does not recognize the phantom standup as a problem. "That is just how we work," they say. But you documented the three decisions that trace back to a meeting nobody attends, and someone will eventually read that document.`,
  },
  'reston-forked-record': {
    critical:
      `You walk both departments through the exact moment the fork happened\u2014a copied spreadsheet in 2021. They laugh, then get serious. By end of day, they agree on a single source and a process to prevent silent forks.`,
    success:
      `One department concedes their version has a date error. The merge is not perfect\u2014some conventions are kept from each side\u2014but both teams agree to annotate differences instead of pretending they do not exist.`,
    mixed:
      `You reconcile the numbers but not the narratives. Both departments now use the same data but interpret it differently. The fork is thinner, but it still exists in how people talk about the past.`,
    failure:
      `Both departments insist their version is correct and the other is "legacy." You cannot force a merge, but you create a comparison document that shows exactly where they diverge. The next budget cycle will make this unavoidable.`,
  },
  'reston-retention-cliff': {
    critical:
      `You catch three departing experts in their last week and conduct structured interviews that capture the "why" behind their systems. The recordings become the most-watched onboarding material the Node has ever produced.`,
    success:
      `You capture most of the critical context from two of the three departing leads. One declines politely. The documentation is good enough that the next person will not have to start from zero.`,
    mixed:
      `You get the interviews, but the departing staff are guarded\u2014they describe processes, not reasons. The knowledge gap narrows, but the institutional instinct is still lost.`,
    failure:
      `The departures happen faster than your interview schedule. You capture fragments: a diagram here, a Slack thread there. It is not nothing, but in six months someone will look at these notes and say "what did they mean by this?"`,
  },
  'reston-memory-palace': {
    critical:
      `You introduce a decay function: policies older than three years without a human endorsement are flagged as "historical." The Palace begins to distinguish between lessons and leftovers. Teams report feeling lighter within a week.`,
    success:
      `The Palace now tags policies with "last validated" dates. Outdated ones are not deleted but dimmed\u2014visible to researchers, invisible to operators. The daily policy feed drops by 40%.`,
    mixed:
      `Your decay logic works, but a vocal faction argues that "forgetting is how mistakes repeat." A compromise emerges: archived policies are accessible but require a deliberate search. The Palace is quieter, not silent.`,
    failure:
      `The Palace resists pruning. Its maintainers argue every policy exists for a reason, even the ones nobody can explain. But your audit reveals 200+ policies referencing org units that no longer exist. That list starts circulating.`,
  },
}

const tysonsNarratives: Record<string, OutcomeNarratives> = {
  'tysons-metric-mirage': {
    critical:
      `You walk five floors with a single question and by afternoon the entire building is debating what "green" actually means. Three dashboards are recalibrated before the end of the week. People start asking "what would red look like?" as a reflex.`,
    success:
      `Two floors agree their metrics are decorative and commit to replacing them. A third resists, but the conversation has started. The mirage is thinner now\u2014you can see through it if you know where to look.`,
    mixed:
      `You expose the gap between the dashboards and reality, but leadership is not ready to admit the numbers they have been presenting are hollow. Your report circulates informally. It will matter in three months.`,
    failure:
      `The Spires are not ready to hear it. "The metrics are fine," they say, and the dashboards stay green. But you noticed which managers looked away when you asked the red question. That tells you who already knows.`,
  },
  'tysons-elevator-pitch': {
    critical:
      `Your question stops the elevator cold. The person next to you cancels their next meeting and walks with you for an hour. By the end, they are describing work they have never pitched because it does not fit in thirty seconds. You have created a crack in the pitch culture.`,
    success:
      `One conversation extends past the elevator ride. The person admits their best work is invisible because it cannot be pitched. You help them frame it differently\u2014not as a pitch, but as a question worth funding.`,
    mixed:
      `The question lands, but the response is defensive: "That is not how things work here." You plant the seed. Someone will water it, but not today, and probably not you.`,
    failure:
      `The elevator doors open and the moment is gone. Nobody has time for slow questions in the Spires. But you wrote the question down, and it ends up on a whiteboard somewhere. Questions have longer half-lives than pitches.`,
  },
  'tysons-dashboard-of-dashboards': {
    critical:
      `You present five metrics on a single page. The room is silent for ten seconds, then someone says: "This is the first time I have understood what we are actually tracking." The mega-dashboard is not killed\u2014it is archived. Your five metrics become the new weekly review.`,
    success:
      `Leadership agrees to try your five metrics for a month alongside the mega-dashboard. Within two weeks, nobody opens the old one. The experiment becomes permanent by default.`,
    mixed:
      `You reduce 400 metrics to 5, but three teams demand their metric be the sixth. The dashboard shrinks from 400 to 12, which is still an improvement. The debate about what matters continues, which is the real progress.`,
    failure:
      `The Dashboard of Dashboards survives. Your proposal is called "interesting but premature." But you documented which of the 400 metrics have never changed a decision, and that list is embarrassingly long. It will surface again.`,
  },
  'tysons-prediction-market': {
    critical:
      `You propose a hybrid: the prediction market feeds anonymized signals into a new forecasting layer that sits alongside the official one. When they diverge, leadership investigates instead of ignoring. The market gains legitimacy; the forecasters gain honesty. Both improve.`,
    success:
      `The market is allowed to continue, officially. Its track record is published quarterly alongside the official forecast. The comparison is uncomfortable but healthy. Forecasters start visiting the market for calibration.`,
    mixed:
      `The market survives in the shadows\u2014officially discouraged, privately consulted. It is the worst of both worlds: leadership uses it when convenient and denies it when challenged. But the signal persists.`,
    failure:
      `The prediction market is shut down by compliance. Official forecasting breathes a sigh of relief and publishes projections that miss by the usual margin. Underground, someone is already building the next version on a different tool.`,
  },
}

const ashburnNarratives: Record<string, OutcomeNarratives> = {
  'ashburn-cold-start': {
    critical:
      `You facilitate a three-way session that produces a migration calendar all teams endorse. The trick: you start with the dependencies, not the workloads. By the end of the week, the first rack is populated and nobody feels colonized.`,
    success:
      `Two teams agree on a shared timeline. The third negotiates a two-week delay in exchange for guaranteed isolation in a separate row. The hall begins to fill in an order that makes sense.`,
    mixed:
      `You get the teams talking, but each insists on reserving more capacity than they need "just in case." The hall is 40% claimed and 10% used. You prevented a turf war but not the hoarding.`,
    failure:
      `The strongest team moves in overnight while the others are still debating. The hall is now "theirs" by convention. But you documented the dependency map, and the next capacity expansion will start with your diagram instead of a land rush.`,
  },
  'ashburn-schema-dispute': {
    critical:
      `You design a boundary layer that gives each team their preferred view of the data without touching the other's layout. The nightly batch job drops from 45 minutes to 12. Both teams claim the solution was obvious, which is how you know it worked.`,
    success:
      `One team agrees to move their heaviest queries to a read replica, relieving pressure on the shared table. The schema stays imperfect but the collisions stop. Both teams sleep through the 3am batch for the first time in months.`,
    mixed:
      `You broker a schema compromise that neither team loves. Normalization stays for the critical tables; the rest gets a denormalized view. The batch job is faster, but the teams now argue about which tables are "critical."`,
    failure:
      `The teams cannot agree, and the nightly batch fails spectacularly during your mediation week. But the outage forces a conversation that your diplomacy could not: leadership now knows the shared table is a liability, and resources are allocated to fix it.`,
  },
  'ashburn-latency-tax': {
    critical:
      `You trace the logging layer to an audit requirement that expired in 2022. With one configuration change, the path drops from 40ms to 5ms. The audit data is redirected to an async pipeline that costs nothing in latency. Users notice the improvement before you announce it.`,
    success:
      `You identify the rogue layer and propose relocating it to an async sidecar. Latency drops to 8ms. The audit trail is preserved, just no longer in the critical path. The engineers who added it are relieved, not defensive.`,
    mixed:
      `You find the logging layer but discover it is also feeding a monitoring dashboard that three teams rely on. You reduce the latency tax from 36ms to 15ms by optimizing the logger, but you cannot remove it without breaking the dashboard.`,
    failure:
      `The logging layer turns out to have dependencies you did not expect\u2014six services read from it. Removing it would cause a cascade. But you map every downstream consumer, and that map becomes the starting point for a proper refactor.`,
  },
  'ashburn-vault-keeper': {
    critical:
      `You recover the credentials through a combination of documentation archaeology and a retired engineer who still remembers. The retention rules are updated in a single session: regulatory changes reflected, cost model inverted, decay functions calibrated. The Vault Keeper wakes up to the present for the first time in eight years.`,
    success:
      `You gain access and update the critical rules. Some edge cases remain\u2014the Keeper still hoards certain legacy formats\u2014but the biggest retention mistakes are corrected. Storage costs drop 30% in the first month.`,
    mixed:
      `You get partial access. Enough to update the retention periods but not the classification logic. The Keeper is better but still sorting objects by 2018 categories. You leave a detailed handoff for whoever gets full access next.`,
    failure:
      `The credentials are truly lost. You cannot update the Keeper directly, but you build a monitoring layer around it that flags suspicious retention decisions for human review. The Keeper still runs on old rules, but now someone is watching.`,
  },
}

const defaultNarratives: OutcomeNarratives = {
  critical:
    `Everything lines up: allies, timing, and unseen infrastructure. The realms remember this moment as a hinge point.`,
  success:
    `You get what you came for with only minor frictions. A few new questions surface, but they feel like invitations, not threats.`,
  mixed:
    `You move the story forward, but the Beltway tacks on a complication: someone else now holds leverage over part of your success.`,
  failure:
    `The plan does not land as intended, yet you walk away with a clearer map of who and what you are really dealing with.`,
}

const allNarratives: Record<string, OutcomeNarratives> = {
  ...arlingtonNarratives,
  ...restonNarratives,
  ...tysonsNarratives,
  ...ashburnNarratives,
}

export function getNarrative(questId: QuestId | string, tier: DiceOutcomeTier): string {
  const perQuest = allNarratives[questId]
  if (perQuest) return perQuest[tier]
  return defaultNarratives[tier]
}
