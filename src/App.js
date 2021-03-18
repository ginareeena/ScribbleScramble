// import logo from "./logo.svg";
// import "./App.css";
import Routes from "./Routes";
// import {BrowserRouter as Router, Link} from 'react-router-dom'
//
// import CanvasComp from "./Canvas.js";
import Drawing from "./Drawing.js";
import WritingCanvas from "./WritingCanvas"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p> */}
      </header>
      <div>
        HI
        {/* <Drawing /> */}
        <Drawing />
        <Routes />
      </div>
      <div>
      <WritingCanvas />
      </div>
    </div>
  );
}

export default App;
