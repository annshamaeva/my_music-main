import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';
import s from './NavigationMenu.module.css';
import { useThemeContext } from '../../context/themes';
import { clearTrackId } from '../../store/slices/trackSlice';
import { clearFilter } from '../../store/slices/filterSlice';

export default function NavigationMenu() {
  const { currentTheme, toggleTheme } = useThemeContext();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(clearTrackId());
    dispatch(clearFilter());
    localStorage.setItem('access', '');
    localStorage.setItem('refresh', '');
    localStorage.setItem('userId', '');
  };
  return (
    <div className={s.menu}>
      <ul className={s.list}>
        <li className={s.item}>
          <Link to="/main" className={s.link}>
            Главное
          </Link>
        </li>
        <li className={s.item}>
          <Link to="/my_tracks" className={s.link}>
            Мой плейлист
          </Link>
        </li>
        <li role="presentation" onClick={handleLogOut} className={s.item}>
          <Link to="/" className={s.link}>
            Выйти
          </Link>
        </li>
      </ul>
      <div role="presentation" onClick={toggleTheme} className={s.changeTheme}>
        <svg className={s.svg} alt="theme">
          <use xlinkHref={`../../img/icons/sprite.svg#icon-${currentTheme}`} />
        </svg>
      </div>
    </div>
  );
}
