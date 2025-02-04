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
          type={InteractiveType.CLICK}
          text="Ouaw! Quel beau gosse !"
          style={{ margin: "10px auto" }}
        >
          <h1
            style={{
              color: "var(--text-color)",
              fontSize: 50,
            }}
          >
            Lucas MARROT
          </h1>
        </InteractiveObject>
        <InteractiveObject
          type={InteractiveType.CLICK}
          className={"leverToggle"}
        >
          <Lever onPull={() => console.log("Lever pulled!")} />
        </InteractiveObject>
      </div>
    </CursorProvider>
  );
}

export default App;
