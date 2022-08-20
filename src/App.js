import { useState } from "react";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import "./styles.css";
// import Resizable from "./Resizable";
import { ResizableBox } from "react-resizable";
export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftFlexGrow, setLeftFlexGrow] = useState("flexGrow");
  const [rightFlexGrow, setRightFlexGrow] = useState("flexNone");
  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(windowWidth - leftWidth);
  const handles = ["s", "e", "w", "n"];

  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((e) => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <div className="App">
      <section className="sidebar">
        <ResizableBox
          height={300}
          width={leftWidth}
          resizeHandles={handles}
          className={leftFlexGrow}
          onResizeStart={() => {
            setLeftFlexGrow("flexNone");
            setRightFlexGrow("flexGrow");
          }}
        >
          <aside className="yellow">
            <h1>Aside Left</h1>
            <p contentEditable={true}></p>
          </aside>
        </ResizableBox>
        <ResizableBox
          height={300}
          width={rightWidth}
          resizeHandles={handles}
          className={rightFlexGrow}
          onResizeStart={(...data) => {
            setLeftFlexGrow("flexGrow");
            setRightFlexGrow("flexNone");
          }}
          onResize={(...data) => {
            console.log(data[1]);
          }}
        >
          <aside className="yellow">
            <h2>Aside right</h2>
            <p contentEditable={true}></p>
          </aside>
        </ResizableBox>
      </section>

      <section className="main">
        <ResizableBox height={600} width={windowWidth} resizeHandles={handles}>
          <article className="yellow">
            <h2>Content</h2>
            <p contentEditable={true}></p>
          </article>
        </ResizableBox>
      </section>

      <div></div>
    </div>
  );
}
