import type { Card } from '../types'

type CardViewProps = {
  card: Card
  isSelected?: boolean
  onSelect?: () => void
  /** When true, renders as a non-interactive div (e.g. in card library). */
  readOnly?: boolean
}

export function CardView({ card, isSelected, onSelect, readOnly }: CardViewProps) {
  const className = `br-card ${isSelected ? 'is-selected' : ''}`

  const content = (
    <>
      <div className="br-metadata-row">
        <span className={`br-chip ${card.kind}`}>{card.kind}</span>
        {card.tags && card.tags.length > 0 && (
          <span className="br-muted">{card.tags.join(' • ')}</span>
        )}
      </div>
      <div className="br-card-title">{card.title}</div>
      <div className="br-card-body">{card.description}</div>
    </>
  )

  if (readOnly) {
    return <div className={className}>{content}</div>
  }

  return (
    <button type="button" className={className} onClick={onSelect}>
      {content}
    </button>
  )
}

