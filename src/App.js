// import logo from "./logo.svg";
// import "./App.css";
import Routes from "./Routes";
// import {BrowserRouter as Router, Link} from 'react-router-dom'
//
// import CanvasComp from "./Canvas.js";
import WritingCanvas from "./WritingCanvas"


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <Routes />
      </div>
      <div>
      <WritingCanvas />
      </div>
    </div>
  );
}

export default App;
