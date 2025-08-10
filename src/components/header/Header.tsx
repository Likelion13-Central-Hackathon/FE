import s from "./Header.module.scss";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
