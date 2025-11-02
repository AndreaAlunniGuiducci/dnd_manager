import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import { routes } from "../../../App";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.linkCOntainer}>
        <Link to={routes.createPG}>Crea nuovo personaggio</Link>
        <Link to={routes.combat}>Gestisci combattimento</Link>
      </div>
    </div>
  );
};
