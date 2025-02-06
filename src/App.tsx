import "./App.css";
import React from "react";
import Cursor from "./components/Cursor/Cursor";
import { CursorProvider } from "./contexts/CursorContext";
import InitScene from "./components/InitScene/InitScene";

function App() {
  const [isInitComplete, setIsInitComplete] = React.useState(false);
  const circleRef = React.useRef<HTMLDivElement>(null);

  return (
    <CursorProvider circleRef={circleRef}>
      <div className="App">
        <Cursor circleRef={circleRef} />
        {!isInitComplete ? (
          <InitScene onComplete={() => setIsInitComplete(true)} />
        ) : (
          <main>
            <h1>Hello ! Ceci est un test</h1>
          </main>
        )}
      </div>
    </CursorProvider>
  );
}

export default App;
