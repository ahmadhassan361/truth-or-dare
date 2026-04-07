import { useState, useEffect } from 'react'
import './TurnScreen.css'

export default function TurnScreen({ players, currentPlayer, onChoice, roundNumber }) {
  const [visible, setVisible] = useState(false)
  const isMale = currentPlayer === 'male'
  const name = isMale ? players.male : players.female
  const emoji = isMale ? '👨' : '👩'
  const otherName = isMale ? players.female : players.male

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [currentPlayer])

  return (
    <div className={`turn-screen ${visible ? 'is-visible' : ''}`}>
      <div className="turn-bg-blob turn-blob-1" />
      <div className="turn-bg-blob turn-blob-2" />

      {/* Top bar */}
      <div className="turn-topbar">
        <div className="round-badge">🎲 Round {roundNumber}</div>
        <div className="score-names">
          <span className={isMale ? 'active-player-name' : 'idle-player-name'}>{players.male} 👨</span>
          <span className="turn-dot">·</span>
          <span className={!isMale ? 'active-player-name' : 'idle-player-name'}>👩 {players.female}</span>
        </div>
      </div>

      {/* Player avatar */}
      <div className="turn-center">
        <div className={`avatar-ring ${isMale ? 'male-ring' : 'female-ring'}`}>
          <div className="avatar-emoji">{emoji}</div>
        </div>

        <div className="turn-label">IT'S YOUR TURN</div>
        <h2 className={`turn-name ${isMale ? 'male-name' : 'female-name'}`}>{name}!</h2>
        <p className="turn-subtext">
          {otherName} is waiting for you 💋
        </p>
      </div>

      {/* Choice buttons */}
      <div className="choice-section">
        <p className="choice-prompt">Choose your challenge</p>
        <div className="choice-buttons">
          <button
            className="choice-btn truth-btn"
            onClick={() => onChoice('truth')}
          >
            <span className="choice-icon">🤫</span>
            <span className="choice-label">TRUTH</span>
            <span className="choice-desc">Answer honestly</span>
          </button>

          <button
            className="choice-btn dare-btn"
            onClick={() => onChoice('dare')}
          >
            <span className="choice-icon">💋</span>
            <span className="choice-label">DARE</span>
            <span className="choice-desc">Do it now</span>
          </button>
        </div>
      </div>
    </div>
  )
}
