import { useState, useRef } from 'react'
import questionsData from './data/questions.json'
import daresData from './data/dares.json'
import PlayerSetup from './components/PlayerSetup'
import TurnScreen from './components/TurnScreen'
import CardScreen from './components/CardScreen'

// ─── Fisher-Yates shuffle ────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Build fresh queues ───────────────────────────────────────────────────────
function buildQueues() {
  return {
    // When female's turn → husband asks her (husbandToWife questions)
    femaleTruth: shuffle([...questionsData.husbandToWife]),
    femaleTruthIdx: 0,

    // When male's turn → wife asks him (wifeToHusband questions)
    maleTruth: shuffle([...questionsData.wifeToHusband]),
    maleTruthIdx: 0,

    // When female's turn → husband dares her (husbandToWife dares + common)
    femaleDare: shuffle([...daresData.husbandToWife, ...daresData.common]),
    femaleDareIdx: 0,

    // When male's turn → wife dares him (wifeToHusband dares + common)
    maleDare: shuffle([...daresData.wifeToHusband, ...daresData.common]),
    maleDareIdx: 0,
  }
}

// ─── Get next item from a queue, reshuffling when exhausted ──────────────────
function getNext(queues, listKey, idxKey) {
  if (queues[idxKey] >= queues[listKey].length) {
    queues[listKey] = shuffle(queues[listKey])
    queues[idxKey] = 0
  }
  const item = queues[listKey][queues[idxKey]]
  queues[idxKey] += 1
  return item
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('setup') // 'setup' | 'turn' | 'card'
  const [players, setPlayers] = useState({ male: '', female: '' })
  const [currentPlayer, setCurrentPlayer] = useState('female')
  const [currentType, setCurrentType] = useState('')   // 'truth' | 'dare'
  const [currentCard, setCurrentCard] = useState('')
  const [roundNumber, setRoundNumber] = useState(1)

  // Queues live in a ref so reshuffling never triggers a re-render
  const queues = useRef(null)

  // ── Start game ──────────────────────────────────────────────────────────────
  function handleStart(maleName, femaleName) {
    setPlayers({ male: maleName, female: femaleName })
    queues.current = buildQueues()
    setCurrentPlayer('female')
    setRoundNumber(1)
    setScreen('turn')
  }

  // ── Player picks Truth or Dare ───────────────────────────────────────────────
  function handleChoice(type) {
    setCurrentType(type)
    const card = pickCard(currentPlayer, type)
    setCurrentCard(card)
    setScreen('card')
  }

  // ── Pick a card from the right queue ────────────────────────────────────────
  function pickCard(player, type) {
    const q = queues.current
    if (player === 'female') {
      return type === 'truth'
        ? getNext(q, 'femaleTruth', 'femaleTruthIdx')
        : getNext(q, 'femaleDare', 'femaleDareIdx')
    } else {
      return type === 'truth'
        ? getNext(q, 'maleTruth', 'maleTruthIdx')
        : getNext(q, 'maleDare', 'maleDareIdx')
    }
  }

  // ── Done: pass turn to other player ─────────────────────────────────────────
  function handleDone() {
    const next = currentPlayer === 'female' ? 'male' : 'female'
    setCurrentPlayer(next)
    if (next === 'female') {
      setRoundNumber(r => r + 1)
    }
    setScreen('turn')
  }

  // ── Skip dare: get another dare for the same player ─────────────────────────
  function handleSkip() {
    const card = pickCard(currentPlayer, 'dare')
    setCurrentCard(card)
  }

  // ── New game (reset names) ───────────────────────────────────────────────────
  function handleNewGame() {
    setScreen('setup')
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {screen === 'setup' && (
        <PlayerSetup onStart={handleStart} />
      )}

      {screen === 'turn' && (
        <TurnScreen
          players={players}
          currentPlayer={currentPlayer}
          onChoice={handleChoice}
          roundNumber={roundNumber}
        />
      )}

      {screen === 'card' && (
        <CardScreen
          players={players}
          currentPlayer={currentPlayer}
          currentType={currentType}
          card={currentCard}
          onDone={handleDone}
          onSkip={handleSkip}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  )
}
