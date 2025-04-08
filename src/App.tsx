import "./App.css";
import React from "react";
import Cursor from "./components/Cursor/Cursor";
import { CursorProvider } from "./contexts/CursorContext";
import InitScene from "./components/_pages/InitScene/InitScene";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/_pages/Home/Home";
import Projects from "./components/_pages/Projects/Projects";

function App() {
  const [isInitComplete, setIsInitComplete] = React.useState(false);

  React.useEffect(() => {
    setIsInitComplete(localStorage.getItem("theme") !== "init" || false);
  }, [isInitComplete]);

  const circleRef = React.useRef<HTMLDivElement>(null);

  return (
    <CursorProvider circleRef={circleRef}>
      <Cursor circleRef={circleRef} />
      <div className="App">
        <HashRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                !isInitComplete ? (
                  <InitScene onComplete={() => setIsInitComplete(true)} />
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<></>} />
          </Routes>
        </HashRouter>
      </div>
    </CursorProvider>
  );
}

export default App;
