import "./App.css";
import Cursor from "./Components/Cursor/Cursor";
import { ThemeProvider } from "./Contexts/ThemeProvider";
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Cursor />
        <h1 style={{ color: "white", fontSize: 50 }}>Lucas</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
