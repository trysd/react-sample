import './App.css'
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <div className="App">
      <p>Vite + React</p>
      { uuidv4() }
    </div>
  )
}

export default App
