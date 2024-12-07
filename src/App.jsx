import { useEffect, useState } from 'react'
import './App.css'
import Board from './Board'
import { firstState, calcScore, Node, minimax, buildTree, nextMove, minimaxPruning } from "./module";
import Settings from './Settings';
import Tree from 'react-d3-tree';

function App() {
  const [gameState, setGameState] = useState({
    board: firstState,
    score: {p1:0, p2:0},
    currentPlayer: 1,
    node: null
  });
  const [settings, setSettings] = useState({
    player: 2,
    k: 5,
    pronning: true
  });
  useEffect( () => {
    if (gameState.currentPlayer  == settings.player) {
      const start = buildTree(new Node(gameState.board.map(column => [...column]),
        gameState.currentPlayer),
      settings.k);
      settings.pronning === true? minimax(start, settings.k, gameState.currentPlayer === 1? true:false)
      : minimaxPruning(start, settings.k, gameState.currentPlayer === 1? true:false)
      let nextNode = nextMove(start)
      
      let newScore = calcScore(nextNode.state);
      setGameState({
        ...gameState,
        board: nextNode.state,
        score: newScore,
        currentPlayer: gameState.currentPlayer === 1? 2:1,
        node: start
      });
    }
  },[gameState.currentPlayer, settings]);

  const renderNode = ({ nodeDatum, toggleNode }) => (
    <g>
      {/* Circle color based on player */}
      <circle
        r={10}
        fill={nodeDatum.player === 1 ? "#18bc9c" : "#ee6677"}
        onClick={toggleNode}
      />
      {/* Node label */}
      <text fill='#fff' x={20} dy={10}>
        Value: {nodeDatum.value}
      </text>
    </g>
  );

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
      {gameState.node !== null && (
        <div className="view">
          <Tree
            data={gameState.node}
            orientation="vertical"
            collapsible={true}
            initialDepth={2}
            nodeSize={{ x: 200, y: 50 }}
            renderCustomNodeElement={(rd3tProps) => renderNode(rd3tProps)} // Custom node rendering
          />
        </div>
      )}
    </>
  )
}

export default App
