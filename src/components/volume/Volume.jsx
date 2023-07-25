import s from './Volume.module.css';

export default function Volume() {
  return (
    <div className={s.volume}>
      <div className={s.content}>
        <div className={s.image}>
          <svg className={s.svg} alt="volume">
            <use xlinkHref="../../img/icons/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={s.progress}>
          <input className={s.progress__line} type="range" name="range" />
        </div>
      </div>
    </div>
  );
}
