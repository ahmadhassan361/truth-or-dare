import { useState } from 'react'
import './PlayerSetup.css'

export default function PlayerSetup({ onStart }) {
  const [maleName, setMaleName] = useState('')
  const [femaleName, setFemaleName] = useState('')
  const [errors, setErrors] = useState({})

  function handleStart() {
    const errs = {}
    if (!maleName.trim()) errs.male = 'Enter husband name'
    if (!femaleName.trim()) errs.female = 'Enter wife name'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onStart(maleName.trim(), femaleName.trim())
  }

  return (
    <div className="setup-screen">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="setup-content">
        {/* Header */}
        <div className="setup-header">
          <div className="fire-icon">🔥</div>
          <h1 className="game-title">Truth or Dare</h1>
          <p className="game-subtitle">❤️‍🔥 Couples Edition — Private &amp; Intimate</p>
        </div>

        {/* Player cards */}
        <div className="player-cards">
          {/* Male */}
          <div className={`player-card male-card ${errors.male ? 'has-error' : ''}`}>
            <div className="player-card-header">
              <span className="player-emoji">👨</span>
              <div>
                <p className="player-role">Husband</p>
                <p className="player-hint">Player 1</p>
              </div>
            </div>
            <input
              className="name-input"
              type="text"
              placeholder="Enter his name…"
              value={maleName}
              onChange={e => { setMaleName(e.target.value); setErrors(p => ({ ...p, male: null })) }}
              maxLength={20}
              autoCapitalize="words"
            />
            {errors.male && <p className="input-error">{errors.male}</p>}
          </div>

          {/* Divider */}
          <div className="vs-divider">
            <div className="vs-line" />
            <span className="vs-text">VS</span>
            <div className="vs-line" />
          </div>

          {/* Female */}
          <div className={`player-card female-card ${errors.female ? 'has-error' : ''}`}>
            <div className="player-card-header">
              <span className="player-emoji">👩</span>
              <div>
                <p className="player-role">Wife</p>
                <p className="player-hint">Player 2</p>
              </div>
            </div>
            <input
              className="name-input"
              type="text"
              placeholder="Enter her name…"
              value={femaleName}
              onChange={e => { setFemaleName(e.target.value); setErrors(p => ({ ...p, female: null })) }}
              maxLength={20}
              autoCapitalize="words"
            />
            {errors.female && <p className="input-error">{errors.female}</p>}
          </div>
        </div>

        {/* Start button */}
        <button className="start-btn" onClick={handleStart}>
          <span className="start-btn-icon">🎮</span>
          <span>LET'S PLAY</span>
        </button>

        <p className="setup-footer">🔒 100% Private · No internet required</p>
      </div>
    </div>
  )
}
