import './App.css';
import { HomeComponent } from './components/home/Home';
import Hello from './components/_test/Hello/Hello';

function App() {
  return (
    <div className="App">
      <HomeComponent />
      <Hello>isHello</Hello>
    </div>
  );
}

export default App;
