import { useState } from 'react'
import './App.css'
import Board from './Board'
import { firstState } from "./module";

function App() {
  const [gameState, setGameState] = useState({
    board: firstState,
    score: {p1:0, p2:0},
    currentPlayer: 1
  })


  return (
    <>
      <h1>Score {gameState.score.p1} - {gameState.score.p2}</h1>
      <Board
        gameState = { gameState }
        setGameState = { setGameState }
      />
    </>
  )
}

export default App
