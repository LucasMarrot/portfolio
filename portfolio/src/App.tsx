import "./App.css";
import InteractiveObject from "./components/Common/InteractiveObject/InteractiveObject";
import Cursor from "./components/Cursor/Cursor";
import { InteractiveType } from "./contexts/InteractiveContext";

function App() {
  return (
    <div className="App">
      <Cursor />
      <InteractiveObject type={InteractiveType.SPEAK} text="Hello!">
        <h1
          style={{
            color: "var(--text-color)",
            fontSize: 50,
          }}
        >
          Lucas
        </h1>
      </InteractiveObject>
    </div>
  );
}

export default App;
