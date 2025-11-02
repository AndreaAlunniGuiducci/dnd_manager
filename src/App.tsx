import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/molecules/header";
import Combat from "./pages/combat";
import CreatePG from "./pages/createPG";

export const routes = {
  home: "/",
  createPG: "/nuovo_personaggio",
  combat: "/combattimento",
};

const router = createHashRouter([
  {
    path: routes.home,
    element: (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      { path: routes.createPG, element: <CreatePG /> },
      { path: routes.combat, element: <Combat /> },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
