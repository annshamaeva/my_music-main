import { useState } from 'react';
import logo from '../../logo.png';
import logoDark from '../../logo_black.png';
import s from './Navigation.module.css';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import Burger from '../burger/Burger';
import { useThemeContext } from '../../context/themes';

export default function Navigation() {
  const { currentTheme } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <nav className={s.nav}>
      <div className={s.logo}>
        <img className={s.image} src={currentTheme === "dark" ? logo : logoDark} alt="logo" />
      </div>
      <Burger onClick={toggleVisibility} />
      {visible && <NavigationMenu />}
    </nav>
  );
}
