import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CreatePG from "./pages/createPG";
import Home from "./pages/home";
import Combat from "./pages/combat";

export const routes = {
  home: "/",
  createPG: "/nuovo_personaggio",
  combat: "/combattimento",
}

const router = createHashRouter([
  { path: routes.home, element: <Home /> },
  { path: routes.createPG, element: <CreatePG /> },
  { path: routes.combat, element: <Combat /> },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
