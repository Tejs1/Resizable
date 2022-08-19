import { useState } from "react";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import "./styles.css";
import Resizable from "./Resizable";
export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((e) => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <div className="App">
      <div className="sidebar">
        <Resizable height={300} width={500} windowWidth={windowWidth}>
          <div className="yellow" contentEditable={true}></div>
        </Resizable>
        <Resizable
          height={300}
          width={windowWidth - 500}
          windowWidth={windowWidth}
        >
          <div className="yellow" contentEditable={true}></div>
        </Resizable>
      </div>

      <div className="main">
        <Resizable height={600} width={windowWidth} windowWidth={windowWidth}>
          <div className="yellow" contentEditable={true}></div>
        </Resizable>
      </div>

      <div></div>
    </div>
  );
}
