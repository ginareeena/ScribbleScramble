import logo from './logo.svg';
import './App.css';
import Routes from './Routes'
// import {BrowserRouter as Router, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
