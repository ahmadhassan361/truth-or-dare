import { useState, useEffect } from 'react'
import './CardScreen.css'

export default function CardScreen({
  players,
  currentPlayer,
  currentType,
  card,
  onDone,
  onSkip,
  onNewGame,
}) {
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(0)
  const isMale = currentPlayer === 'male'
  const isTruth = currentType === 'truth'
  const name = isMale ? players.male : players.female
  const emoji = isMale ? '👨' : '👩'

  useEffect(() => {
    setVisible(false)
    setKey(k => k + 1)
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [card])

  function handleSkip() {
    setVisible(false)
    setTimeout(() => { onSkip() }, 200)
  }

  function handleDone() {
    setVisible(false)
    setTimeout(() => { onDone() }, 200)
  }

  return (
    <div className="card-screen">
      <div className="card-blob card-blob-1" />
      <div className="card-blob card-blob-2" />

      {/* Top nav */}
      <div className="card-topbar">
        <div className={`type-badge ${isTruth ? 'truth-badge' : 'dare-badge'}`}>
          <span>{isTruth ? '🤫' : '💋'}</span>
          <span>{isTruth ? 'TRUTH' : 'DARE'}</span>
        </div>
        <div className="card-player-tag">
          <span className="card-player-emoji">{emoji}</span>
          <span className="card-player-name">{name}</span>
        </div>
      </div>

      {/* Card */}
      <div className="card-body">
        <div
          key={key}
          className={`question-card ${isTruth ? 'truth-card' : 'dare-card'} ${visible ? 'card-visible' : ''}`}
        >
          {/* Card top accent */}
          <div className={`card-accent ${isTruth ? 'truth-accent' : 'dare-accent'}`} />

          {/* Card icon */}
          <div className="card-type-icon">
            {isTruth ? '🤫' : '💋'}
          </div>

          {/* Card label */}
          <p className={`card-type-label ${isTruth ? 'truth-label' : 'dare-label'}`}>
            {isTruth ? 'TRUTH' : 'DARE'}
          </p>

          {/* The question / dare text */}
          <p className="card-text">{card}</p>

          {/* Addressed to */}
          <div className="card-addressed">
            <span className="card-addressed-emoji">{emoji}</span>
            <span className="card-addressed-text">
              {isTruth
                ? `${name}, answer this honestly`
                : `${name}, do this dare`}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="card-actions">
        {/* Skip dare button — only for dare */}
        {!isTruth && (
          <button className="skip-btn" onClick={handleSkip}>
            <span className="skip-icon">🔄</span>
            <span>Try Another Dare</span>
          </button>
        )}

        {/* Done button */}
        <button
          className={`done-btn ${isTruth ? 'truth-done' : 'dare-done'}`}
          onClick={handleDone}
        >
          <span className="done-icon">✅</span>
          <span>DONE — Next Turn</span>
        </button>

        {/* New game link */}
        <button className="new-game-link" onClick={onNewGame}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  )
}
