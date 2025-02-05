import React from "react";
import "./App.css";
import InteractiveObject from "./components/Common/InteractiveObject/InteractiveObject";
import Cursor from "./components/Cursor/Cursor";
import { CursorProvider } from "./contexts/CursorContext";
import { InteractiveType } from "./contexts/InteractiveContext";
import Lever from "./components/Lever/Lever";

function App() {
  const circleRef = React.useRef<HTMLDivElement>(null);
  return (
    <CursorProvider circleRef={circleRef}>
      <div className="App">
        <Cursor circleRef={circleRef} />
        <InteractiveObject
          type={InteractiveType.SPEAK}
          text="Hello !"
          className={"leverContainer"}
        >
          <Lever />
        </InteractiveObject>
      </div>
    </CursorProvider>
  );
}

export default App;
