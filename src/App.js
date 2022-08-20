import { useState, useEffect } from "react";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import "./styles.css";
// import Resizable from "./Resizable";
import { ResizableBox } from "react-resizable";
export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(windowWidth - leftWidth);
  const [asideHeight, setAsideHeight] = useState(400);
  const [articleHeight, setArticleHeight] = useState(
    windowHeight - asideHeight
  );
  const handles = ["s", "e", "w", "n"];

  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((e) => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  });
  useEffect(() => {
    setLeftWidth(leftWidth);
    setRightWidth(windowWidth - leftWidth);
  }, [windowWidth]);

  return (
    <div className="App">
      <section className="sidebar">
        <ResizableBox
          height={asideHeight}
          width={leftWidth}
          resizeHandles={handles}
          onResize={(...data) => {
            setLeftWidth(data[1].size.width);
            setRightWidth(windowWidth - data[1].size.width);
            setAsideHeight(data[1].size.height);
            setArticleHeight(windowHeight - data[1].size.height);
          }}
        >
          <aside className="yellow">
            <h1>Aside Left</h1>
            <p contentEditable={true}></p>
          </aside>
        </ResizableBox>
        <ResizableBox
          height={asideHeight}
          width={rightWidth}
          resizeHandles={handles}
          onResize={(...data) => {
            setLeftWidth(windowWidth - data[1].size.width);
            setRightWidth(data[1].size.width);
            setAsideHeight(data[1].size.height);
            setArticleHeight(windowHeight - data[1].size.height);
          }}
        >
          <aside className="yellow">
            <h2>Aside right</h2>
            <p contentEditable={true}></p>
          </aside>
        </ResizableBox>
      </section>

      <section className="main">
        <ResizableBox
          height={articleHeight}
          width={windowWidth}
          resizeHandles={handles}
          onResize={(...data) => {
            setArticleHeight(data[1].size.height);
            setAsideHeight(windowHeight - data[1].size.height);
          }}
        >
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
