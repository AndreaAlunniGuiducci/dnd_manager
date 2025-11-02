import { Link } from "react-router-dom";
import { routes } from "../../App";

export const Home = () => {
  return (
    <div>
      <Link to={routes.createPG}>Crea nuovo personaggio</Link>
      <Link to={routes.combat}>Gestisci combattimento</Link>
    </div>
  );
};
