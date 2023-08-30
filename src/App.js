import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game/Game";
import Games from "./pages/Games/Games";

function App() {
  return (
    <div className={"app-wrapper"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Games />}></Route>
          <Route path={"/game/:gameId"} element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
