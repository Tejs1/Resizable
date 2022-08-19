import { ResizableBox } from "react-resizable";
const Resizable = ({ children, height, width }) => {
  return (
    <ResizableBox
      height={height}
      width={width}
      resizeHandles={["s", "e", "w", "n"]}
      onResize={(...data) => {
        console.log(data[1]);
      }}
    >
      {children}
    </ResizableBox>
  );
};
export default Resizable;
