import { useEffect, useState } from "react";
import s from "./Header.module.scss";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
