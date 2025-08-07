import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <NavLink
        to="/main"
        className={({ isActive }) =>
          isActive ? `${s.link} ${s.active}` : s.link
        }
      >
        창업할각?
      </NavLink>
      <NavLink
        to="/form"
        className={({ isActive }) =>
          isActive ? `${s.link} ${s.active}` : s.link
        }
      >
        분석할각?
      </NavLink>
      <NavLink
        to="/document"
        className={({ isActive }) =>
          isActive ? `${s.link} ${s.active}` : s.link
        }
      >
        선정될각?
      </NavLink>
    </nav>
  );
};

export default Navbar;
