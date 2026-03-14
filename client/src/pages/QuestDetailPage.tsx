import { Link, useParams } from 'react-router-dom'
import { getQuestById } from '../data/quests'
import { getRegionById } from '../data/regions'
import { getLoreById } from '../data/lore'

export function QuestDetailPage() {
  const { questId } = useParams()
  const quest = getQuestById(questId)
  const region = quest ? getRegionById(quest.regionId) : undefined
  const lore = quest ? getLoreById(quest.loreId) : undefined

  if (!quest) {
    return (
      <section className="br-panel parchment">
        <div className="br-panel-title">Lore not found</div>
        <p className="br-lore-body">
          This quest id does not map to any lore entry in the current seed data. You can adjust or
          extend the lore under <code>src/data/lore.ts</code>.
        </p>
      </section>
    )
  }

  return (
    <div className="br-grid">
      <section className="br-panel parchment">
        <div className="br-panel-title">{quest.title}</div>
        <div className="br-panel-subtitle">
          {region ? region.name : 'Unmapped realm'} • Quest details
        </div>
        <div className="br-stack">
          <p className="br-lore-body">
            <strong>Summary:</strong> {quest.summary}
          </p>
          <p className="br-lore-body">
            <strong>Objective:</strong> {quest.objective}
          </p>
          <p className="br-lore-body">
            <strong>Stakes:</strong> {quest.stakes}
          </p>
        </div>
      </section>

      <aside className="br-panel parchment">
        <div className="br-panel-title">Lore panel</div>
        <div className="br-panel-subtitle">
          A short entry you can expand into a full case study or story later.
        </div>
        {lore ? (
          <div className="br-stack">
            <h3>{lore.title}</h3>
            <p className="br-lore-body">{lore.body}</p>
            {lore.footnote && <p className="br-muted">{lore.footnote}</p>}
          </div>
        ) : (
          <p className="br-muted">
            There is no lore entry wired to this quest yet. Add one under{' '}
            <code>src/data/lore.ts</code> and reference it from the quest.
          </p>
        )}
        <div className="br-list-actions" style={{ marginTop: '0.75rem' }}>
          {region && (
            <>
              <Link
                to={`/encounter/${region.id}/${quest.id}`}
                className="br-button"
              >
                Play encounter
              </Link>
              <Link to={`/region/${region.id}`} className="br-button secondary">
                Back to region
              </Link>
            </>
          )}
          <Link to="/map" className="br-button secondary">
            World map
          </Link>
        </div>
      </aside>
    </div>
  )
}

