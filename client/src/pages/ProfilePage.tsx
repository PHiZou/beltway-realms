import { Link } from 'react-router-dom'
import { regions } from '../data/regions'
import { quests } from '../data/quests'
import { cards } from '../data/cards'
import { achievements, getUnlockedAchievements } from '../data/achievements'
import { useGameState } from '../state/GameStateProvider'
import { usePageTitle } from '../hooks/usePageTitle'

export function ProfilePage() {
  usePageTitle('Profile')
  const { state } = useGameState()
  const { xp, completedQuestIds, unlockedCardIds, discoveredRegionIds, spentInsightCardIds } = state

  const totalQuests = quests.length
  const playableRegions = regions.filter((r) => r.fullPlayable)
  const completedRegions = playableRegions.filter((r) => {
    const rq = quests.filter((q) => q.regionId === r.id)
    return rq.length > 0 && rq.every((q) => completedQuestIds.includes(q.id))
  })

  const unlockedSkills = cards.filter((c) => c.kind === 'skill' && unlockedCardIds.includes(c.id))
  const unlockedDialogues = cards.filter((c) => c.kind === 'dialogue' && unlockedCardIds.includes(c.id))
  const unlockedInsights = cards.filter((c) => c.kind === 'insight' && unlockedCardIds.includes(c.id))
  const totalCards = unlockedSkills.length + unlockedDialogues.length + unlockedInsights.length

  const pctQuests = totalQuests > 0 ? Math.round((completedQuestIds.length / totalQuests) * 100) : 0

  const ctx = { completedQuestIds, unlockedCardIds, discoveredRegionIds, xp, spentInsightCardIds }
  const earned = getUnlockedAchievements(ctx)
  const earnedIds = new Set(earned.map((a) => a.id))

  return (
    <div className="br-grid">
      <section className="br-panel parchment">
        <div className="br-panel-title">Traveler Profile</div>
        <div className="br-panel-subtitle">Your journey through the Beltway Realms</div>

        <div className="br-stats-grid">
          <div className="br-stat-card">
            <span className="br-stat-value">{xp}</span>
            <span className="br-stat-label">Experience</span>
          </div>
          <div className="br-stat-card">
            <span className="br-stat-value">{completedQuestIds.length}/{totalQuests}</span>
            <span className="br-stat-label">Quests ({pctQuests}%)</span>
          </div>
          <div className="br-stat-card">
            <span className="br-stat-value">{completedRegions.length}/{playableRegions.length}</span>
            <span className="br-stat-label">Regions cleared</span>
          </div>
          <div className="br-stat-card">
            <span className="br-stat-value">{totalCards}</span>
            <span className="br-stat-label">Cards collected</span>
          </div>
          <div className="br-stat-card">
            <span className="br-stat-value">{discoveredRegionIds.length}/{regions.length}</span>
            <span className="br-stat-label">Regions discovered</span>
          </div>
          <div className="br-stat-card">
            <span className="br-stat-value">{earned.length}/{achievements.length}</span>
            <span className="br-stat-label">Achievements</span>
          </div>
        </div>

        <div className="br-progress-section">
          <span className="br-dice-label">Overall progress</span>
          <div className="br-progress-bar">
            <div
              className="br-progress-fill"
              style={{ width: `${pctQuests}%` }}
            />
          </div>
          <span className="br-muted">{pctQuests}% of all encounters completed</span>
        </div>

        <hr className="br-divider" />

        <div className="br-panel-title" style={{ fontSize: '0.95rem' }}>Achievements</div>
        <div className="br-panel-subtitle">
          {earned.length} of {achievements.length} milestones earned
        </div>
        <div className="br-achievement-grid">
          {achievements.map((a) => {
            const unlocked = earnedIds.has(a.id)
            return (
              <div
                key={a.id}
                className={`br-achievement ${unlocked ? 'is-earned' : 'is-locked'}`}
              >
                <span className="br-achievement-icon">{a.icon}</span>
                <div className="br-achievement-info">
                  <span className="br-achievement-title">{a.title}</span>
                  <span className="br-achievement-desc">{a.description}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <aside className="br-panel">
        <div className="br-panel-title">Region progress</div>
        <div className="br-panel-subtitle">Status of each playable realm</div>

        <ul className="br-list">
          {playableRegions.map((r) => {
            const rq = quests.filter((q) => q.regionId === r.id)
            const done = rq.filter((q) => completedQuestIds.includes(q.id)).length
            const total = rq.length
            const allDone = done === total && total > 0

            const prereqMet = !r.prerequisiteRegionId
              || quests
                  .filter((q) => q.regionId === r.prerequisiteRegionId)
                  .every((q) => completedQuestIds.includes(q.id))

            return (
              <li
                key={r.id}
                className={`br-list-item ${allDone ? 'is-complete' : ''} ${!prereqMet ? 'is-locked' : ''}`}
              >
                <div className="br-list-label">
                  <span className="br-list-title">
                    {r.name}
                    {allDone && ' \u2713'}
                  </span>
                  <span className="br-list-subtitle">
                    {!prereqMet
                      ? 'Locked'
                      : `${done} / ${total} encounters`}
                  </span>
                </div>
                <div className="br-list-actions">
                  {prereqMet && (
                    <Link to={`/region/${r.id}`} className="br-button secondary">
                      {allDone ? 'Revisit' : 'Enter'}
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        <div style={{ marginTop: '1rem' }}>
          <div className="br-panel-title">Card collection</div>
          <div className="br-panel-subtitle">
            {unlockedSkills.length} skills, {unlockedDialogues.length} dialogue, {unlockedInsights.length} insights
          </div>
          <div className="br-list-actions" style={{ marginTop: '0.5rem' }}>
            <Link to="/cards" className="br-button secondary">View full library</Link>
            <Link to="/map" className="br-button secondary">World map</Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
