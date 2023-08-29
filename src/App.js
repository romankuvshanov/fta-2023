import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game/Game";
import Games from "./pages/Games/Games";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Games />}></Route>
        <Route path={"/game"} element={<Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
