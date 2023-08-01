import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css";

export const NavBar = () => {
    return (
        <header>
            <nav className={css.navbar}>
                <ul className={css.navlist}>
                    <li>
                        <NavLink
                            to="/"
                            className={css.navlink}
                            activeclassname="bg-blue-700"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/tweets"
                            className={css.navlink}
                            activeclassname="bg-blue-700"
                        >
                            Tweets
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};