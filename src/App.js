import "./styles.css";
import Resizable from "./Resizable";
export default function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <Resizable>
          <div className="yellow"></div>
        </Resizable>
        <Resizable>
          <div className="yellow"></div>
        </Resizable>
      </div>

      <div className="main">
        <Resizable>
          <div className="yellow"></div>
        </Resizable>
      </div>

      <div></div>
    </div>
  );
}
