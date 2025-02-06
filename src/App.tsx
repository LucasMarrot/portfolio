import "./App.css";
import React from "react";
import Cursor from "./components/Cursor/Cursor";
import { CursorProvider } from "./contexts/CursorContext";
import InitScene from "./components/InitScene/InitScene";
import { useStrings } from "./customHooks/useStrings";

function App() {
  const [isInitComplete, setIsInitComplete] = React.useState(false);
  const circleRef = React.useRef<HTMLDivElement>(null);
  const strings = useStrings();

  return (
    <CursorProvider circleRef={circleRef}>
      <div className="App">
        <Cursor circleRef={circleRef} />
        {!isInitComplete ? (
          <InitScene onComplete={() => setIsInitComplete(true)} />
        ) : (
          <main>
            <h1>{strings.title}</h1>
          </main>
        )}
      </div>
    </CursorProvider>
  );
}

export default App;
