import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/Game/Game";
import Games from "./pages/Games/Games";

function NoMatch() {
  return (
    <div>
      <h1 className={'no-match-message'}>404: Page Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <div className={"app-wrapper"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Games />}></Route>
          <Route path={"/game/:gameId"} element={<Game />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
