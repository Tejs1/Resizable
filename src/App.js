import { useState, useEffect } from "react";
import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent";
import "./styles.css";
import { ResizableBox } from "react-resizable";
import Content from "./Content";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { config } from "./config";
const firebaseApp = initializeApp(config.firebase);
const firestore = getFirestore(firebaseApp);
const fieldsCol = collection(firestore, "fields");
export default function App() {
  const margin = 3 * 16;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth - margin);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight - margin);
  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(windowWidth - leftWidth);
  const [articleWidth, setArticleWidth] = useState(windowWidth);
  const [asideHeight, setAsideHeight] = useState(400);
  const [articleHeight, setArticleHeight] = useState(
    windowHeight - asideHeight
  );

  const handles = ["s", "e", "w", "n"];

  const onWindowResize = useGlobalEvent("resize");
  onWindowResize((e) => {
    setWindowWidth(window.innerWidth - 3 * margin);
    setWindowHeight(window.innerHeight);
  });
  useEffect(() => {
    setLeftWidth(leftWidth);
    setRightWidth(windowWidth - leftWidth);
    setArticleWidth(windowWidth);
  }, [windowWidth]);

  return (
    <div className="App">
      <section className="sidebar">
        <ResizableBox
          className="left"
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
            <Content name={"leftTextarea"} id={"0"} fieldsCol={fieldsCol} />
          </aside>
        </ResizableBox>
        <ResizableBox
          className="right"
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
            <Content name={"rightTextarea"} id={"1"} fieldsCol={fieldsCol} />
          </aside>
        </ResizableBox>
      </section>

      <section className="main">
        <ResizableBox
          className="bottom"
          height={articleHeight}
          width={articleWidth}
          resizeHandles={handles}
          onResize={(...data) => {
            setArticleWidth(data[1].size.width);
            setArticleHeight(data[1].size.height);
            setAsideHeight(windowHeight - data[1].size.height);
          }}
        >
          <article className="yellow">
            <h2>Content</h2>
            <Content name={"bottomTextarea"} id={"2"} fieldsCol={fieldsCol} />
          </article>
        </ResizableBox>
      </section>

      <div></div>
    </div>
  );
}
