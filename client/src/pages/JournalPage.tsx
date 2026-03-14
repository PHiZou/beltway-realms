import { Link } from 'react-router-dom'
import { regions } from '../data/regions'
import { quests } from '../data/quests'
import { useGameState } from '../state/GameStateProvider'
import { usePageTitle } from '../hooks/usePageTitle'

const tierLabel: Record<string, string> = {
  critical: 'Critical Success',
  success: 'Success',
  mixed: 'Mixed Result',
  failure: 'Complication',
}

export function JournalPage() {
  usePageTitle('Journal')
  const { state } = useGameState()
  const { completedQuestIds, questOutcomes } = state

  const playableRegions = regions.filter((r) => r.fullPlayable)

  if (completedQuestIds.length === 0) {
    return (
      <div className="br-grid">
        <section className="br-panel parchment">
          <div className="br-panel-title">Quest Journal</div>
          <div className="br-panel-subtitle">Your story through the Beltway Realms</div>
          <p className="br-lore-body">
            No entries yet. Begin your journey in{' '}
            <Link to="/region/arlington" className="br-inline-link">
              Arlington Nexus
            </Link>{' '}
            to start writing your story.
          </p>
        </section>
        <aside className="br-panel">
          <div className="br-panel-title">How it works</div>
          <div className="br-panel-subtitle">
            Every encounter you complete is recorded here with its outcome, narrative, and dice result.
          </div>
          <p className="br-muted">
            Your journal becomes a record of the decisions you made and the stories the Beltway
            told in response. No two playthroughs are the same.
          </p>
          <div className="br-list-actions" style={{ marginTop: '0.5rem' }}>
            <Link to="/region/arlington" className="br-button">Begin in Arlington</Link>
          </div>
        </aside>
      </div>
    )
  }

  return (
    <div className="br-journal-layout">
      <div className="br-journal-header">
        <div className="br-panel-title">Quest Journal</div>
        <div className="br-panel-subtitle">
          {completedQuestIds.length} encounter{completedQuestIds.length !== 1 ? 's' : ''} recorded
        </div>
      </div>

      <div className="br-journal-timeline">
        {playableRegions.map((region) => {
          const regionQuests = quests.filter(
            (q) => q.regionId === region.id && completedQuestIds.includes(q.id),
          )
          if (regionQuests.length === 0) return null

          const totalForRegion = quests.filter((q) => q.regionId === region.id).length
          const allDone = regionQuests.length === totalForRegion

          return (
            <div key={region.id} className="br-journal-region">
              <div className="br-journal-region-header">
                <div className="br-journal-region-title">
                  {region.name}
                  {allDone && <span className="br-chip skill">Complete</span>}
                </div>
                <div className="br-muted">
                  {regionQuests.length} / {totalForRegion} encounters
                </div>
              </div>

              <div className="br-journal-entries">
                {regionQuests.map((quest, idx) => {
                  const outcome = questOutcomes[quest.id]
                  const isBoss = quest.title.startsWith('Boss:')

                  return (
                    <div key={quest.id} className="br-journal-entry">
                      <div className="br-journal-entry-marker">
                        <div className={`br-journal-dot ${outcome?.tier ?? 'success'}`} />
                        {idx < regionQuests.length - 1 && <div className="br-journal-line" />}
                      </div>
                      <div className="br-journal-entry-content">
                        <div className="br-journal-entry-header">
                          <span className="br-journal-entry-title">
                            {isBoss && '\u2605 '}
                            {quest.title}
                          </span>
                          {outcome && (
                            <span className={`br-chip ${outcome.tier}`}>
                              {tierLabel[outcome.tier] ?? outcome.tier}
                            </span>
                          )}
                        </div>

                        {outcome ? (
                          <>
                            <p className="br-journal-narrative">{outcome.narrative}</p>
                            <div className="br-journal-meta">
                              <span>d20: {outcome.roll}</span>
                              {outcome.modifier !== 0 && (
                                <span>
                                  modifier: {outcome.modifier >= 0 ? '+' : ''}{outcome.modifier}
                                </span>
                              )}
                              <span>total: {outcome.roll + outcome.modifier}</span>
                              <span>+{outcome.xpEarned} XP</span>
                            </div>
                          </>
                        ) : (
                          <p className="br-muted">
                            Completed before journal tracking was added. Replay to record the full story.
                          </p>
                        )}

                        <div className="br-journal-entry-actions">
                          <Link
                            to={`/encounter/${region.id}/${quest.id}`}
                            className="br-button secondary"
                          >
                            Replay
                          </Link>
                          <Link to={`/quest/${quest.id}`} className="br-button secondary">
                            Lore
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
