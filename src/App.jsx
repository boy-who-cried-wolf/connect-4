import { useState } from 'react'
import './App.css'
import Board from './Board'

function App() {
  const [score, setScore] = useState({p1:0, p2:0})
  const [currentPlayer, setCurrentPlayer] = useState(1)


  return (
    <>
      <h1>Score {score.p1} - {score.p2}</h1>
      <Board
        currentPlayer = { currentPlayer }
        switchPlayer = { (current) => setCurrentPlayer(current === 1? 2:1) }
      />
    </>
  )
}

export default App
