import { useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState({p1:0, p2:0})

  return (
    <>
      <h1>Score {score.p1} - {score.p2} </h1>
    </>
  )
}

export default App
