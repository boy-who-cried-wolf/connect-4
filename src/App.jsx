import { useState } from 'react'
import './App.css'
import Board from './Board'
import { firstState, calcScore, Node, minimax, buildTree, nextMove, minimaxPruning } from "./module";
import Settings from './Settings';

function App() {
  const [gameState, setGameState] = useState({
    board: firstState,
    score: {p1:0, p2:0},
    currentPlayer: 1
  });
  const [settings, setSettings] = useState({
    player: 2,
    k: 5,
    pronning: true
  });

  if (gameState.currentPlayer  == settings.player) {
    const start = buildTree(new Node(gameState.board.map(column => [...column]),
      gameState.currentPlayer),
    settings.k);
    settings.pronning === true? minimax(start, settings.k, gameState.currentPlayer === 1? true:false)
    : minimaxPruning(start, settings.k, gameState.currentPlayer === 1? true:false)
    let nextNode = nextMove(start)
    //const newBoard = gameState.board.map(column => [...column]); // Deep copy the board
    let newScore = calcScore(nextNode.state);
    setGameState({
      ...gameState,
      board: nextNode.state,
      score: newScore,
      currentPlayer: gameState.currentPlayer === 1? 2:1
    });
  }


  return (
    <>
      <h1>Score {gameState.score.p1} - {gameState.score.p2}</h1>
      <Board
        gameState = { gameState }
        setGameState = { setGameState }
      />
      <Settings
        settings = { settings }
        setSettings = { setSettings }
      />
    </>
  )
}

export default App
