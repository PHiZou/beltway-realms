import { Link } from 'react-router-dom'
import { getRegionById } from '../data/regions'
import { quests } from '../data/quests'
import { useGameState } from '../state/GameStateProvider'
import { usePageTitle } from '../hooks/usePageTitle'

export function LandingPage() {
  usePageTitle()
  const arlington = getRegionById('arlington')
  const reston = getRegionById('reston')
  const tysons = getRegionById('tysons')
  const ashburn = getRegionById('ashburn')
  const { state } = useGameState()

  const isDone = (regionId: string) =>
    quests.filter((q) => q.regionId === regionId).every((q) => state.completedQuestIds.includes(q.id))

  const arlingtonDone = isDone('arlington')
  const restonDone = isDone('reston')
  const tysonsDone = isDone('tysons')

  const nextRegion = !arlingtonDone
    ? arlington
    : !restonDone
      ? reston
      : !tysonsDone
        ? tysons
        : ashburn

  const nextLabel = !arlingtonDone
    ? 'Begin in Arlington'
    : !restonDone
      ? 'Continue to Reston'
      : !tysonsDone
        ? 'Enter Tysons Spires'
        : 'Enter Ashburn'

  const nextDescription = !arlingtonDone
    ? 'Four encounters introduce the card system, dice resolution, and the hidden problem: The Fragmentation.'
    : !restonDone
      ? 'Four encounters about institutional memory, phantom processes, and the danger of an organization that cannot forget.'
      : !tysonsDone
        ? 'Four encounters about metrics, measurement, and the stories numbers tell when nobody is checking.'
        : 'Four encounters about infrastructure, invisible systems, and the people who keep everything running.'

  return (
    <div className="br-grid">
      <section className="br-panel parchment">
        <div className="br-panel-title">Welcome to the Beltway Realms</div>
        <div className="br-panel-subtitle">
          A game-inspired portfolio set across a fantasy / cyberpunk Northern Virginia and D.C.
        </div>
        <div className="br-stack">
          <p className="br-lore-body">
            The Beltway is reimagined as a ring of overlapping realms: data dominions, archive
            stacks, policy bastions, and skyline markets. Instead of menus and bullet points, you
            travel by map and play encounters with a small hand of cards.
          </p>
          {nextRegion && (
            <div className="br-landing-cta">
              <p className="br-lore-body">
                <strong>{nextRegion.name}</strong> {'\u2014'} {nextDescription}
              </p>
              <Link to={`/region/${nextRegion.id}`} className="br-button br-cta-primary">
                {nextLabel}
              </Link>
            </div>
          )}
          <p className="br-muted">
            No accounts, no backend — everything persists in your browser.
          </p>
        </div>
      </section>

      <aside className="br-panel">
        <div className="br-panel-title">Journey</div>
        <div className="br-panel-subtitle">
          Four regions are fully playable. More realms are coming.
        </div>
        <ul className="br-list">
          {[
            { region: arlington, done: arlingtonDone, locked: false, desc: 'The Fragmentation. Four encounters, one boss.', prereqName: '' },
            { region: reston, done: restonDone, locked: !arlingtonDone, desc: 'Institutional memory. Four encounters, one boss.', prereqName: 'Arlington' },
            { region: tysons, done: tysonsDone, locked: !restonDone, desc: 'Metrics and measurement. Four encounters, one boss.', prereqName: 'Reston' },
            { region: ashburn, done: isDone('ashburn'), locked: !tysonsDone, desc: 'Infrastructure and invisible systems. Four encounters, one boss.', prereqName: 'Tysons' },
          ].map(({ region: r, done, locked, desc, prereqName }, idx) =>
            r ? (
              <li key={r.id} className={`br-list-item ${done ? 'is-complete' : ''} ${locked ? 'is-locked' : ''}`}>
                <div className="br-list-label">
                  <span className="br-list-title">
                    {idx + 1}. {r.name} {done ? '\u2713' : ''}
                  </span>
                  <span className="br-list-subtitle">
                    {locked ? `Unlocks after ${prereqName}.` : desc}
                  </span>
                </div>
                <div className="br-list-actions">
                  {locked ? (
                    <span className="br-chip quest">Locked</span>
                  ) : (
                    <Link to={`/region/${r.id}`} className="br-button secondary">
                      {done ? 'Revisit' : 'Go'}
                    </Link>
                  )}
                </div>
              </li>
            ) : null,
          )}
          <li className="br-list-item">
            <div className="br-list-label">
              <span className="br-list-title">Explore the map</span>
              <span className="br-list-subtitle">
                See all regions, completed and upcoming.
              </span>
            </div>
            <div className="br-list-actions">
              <Link to="/map" className="br-button secondary">Map</Link>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  )
}
