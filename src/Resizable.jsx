import { ResizableBox } from "react-resizable";
const Resizable = ({ children }) => {
  return (
    <ResizableBox
      height={300}
      width={300}
      resizeHandles={["s", "e", "w", "n"]}
      onResizeStart={(e, data) => {
        console.log(e);
        console.log(data);
      }}
    >
      {children}
    </ResizableBox>
  );
};
export default Resizable;
