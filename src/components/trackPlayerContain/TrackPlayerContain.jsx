
import s from './TrackPlayerContain.module.css';

export default function TrackPlayerContain({title, author}) {



  return (
    <div className={s.contain}>
      <div className={s.image}>
        <svg className={s.svg} alt="music">
          <use xlinkHref="../../img/icons/sprite.svg#icon-note" />
        </svg>
      </div>
      <div className={s.title}>
        <a className={s.title__link} href="http://">
          {title}
        </a>
      </div>
      <div className={s.author}>
        <a className={s.author__link} href="http://">
         {author}
        </a>
      </div>
    </div>
  );
}
