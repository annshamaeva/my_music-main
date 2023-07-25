import { Link } from 'react-router-dom';
import s from './PlayListBlock.module.css';

export default function PlayListBlock() {
  return (
    <div className={s.block}>
      <div className={s.list}>
        <div className={s.item}>
          <Link className={s.link} to="/playlist_day">
            <img
              className={s.img}
              src="../../img/playlist01.png"
              alt="day's playlist"
            />
          </Link>
        </div>
        <div className={s.item}>
          <Link className={s.link} to="/playlist_hundred">
            <img
              className={s.img}
              src="../../img/playlist02.png"
              alt="100 playlist"
            />
          </Link>
        </div>
        <div className={s.item}>
          <Link className={s.link} to="/playlist_indi">
            <img
              className={s.img}
              src="../../img/playlist03.png"
              alt="indi playlist"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
