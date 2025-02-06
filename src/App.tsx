import "./App.css";
import React from "react";
import Cursor from "./components/Cursor/Cursor";
import { CursorProvider } from "./contexts/CursorContext";
import InitScene from "./components/_pages/InitScene/InitScene";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/_pages/Home/Home";

function App() {
  const [isInitComplete, setIsInitComplete] = React.useState(false);
  const circleRef = React.useRef<HTMLDivElement>(null);

  return (
    <CursorProvider circleRef={circleRef}>
      <Cursor circleRef={circleRef} />
      <div className="App">
        <BrowserRouter basename="/portfolio">
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
            <Route path="/projects" element={<></>} />
            <Route path="/contact" element={<></>} />
          </Routes>
        </BrowserRouter>
      </div>
    </CursorProvider>
  );
}

export default App;
