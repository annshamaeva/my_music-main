/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import s from './Track.module.css';

export default function Track(props) {
  const [isFavorite, setIsFavorite] = useState('')
  
  const timeFormat = (() => {
    function num(val){
        val = Math.floor(val);
        return val < 10 ? `0${  val}` : val;
    }

    return function (ms){
        const sec = ms / 1000
          ; const minutes = sec / 60 % 60
          ; const seconds = sec % 60
        ;

        return `${  num(minutes)  }:${  num(seconds)}`;
    };
})();

  useEffect(() => {
    if (props.favorite.length > 0) {
      setIsFavorite(true);
    } else {
    setIsFavorite(false);
    }
  },)

  return (
    <div role='presentation'  onClick={() => props.handleClick(props.id, props.source, isFavorite)} className={s.item}>
      <div className={s.track}>
        <div className={s.title}>
          <div className={s.image}>
            <svg className={s.title__svg} alt="music">
              <use xlinkHref="../../img/icons/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className="track__title-text">
            <a
             
              className={s.title__link}
              href="#"
            >
              {props.title}
              <span className={s.span}>{props.titleSpan}</span>
            </a>
          </div>
        </div>
        <div className={s.author}>
          <a className={s.author__link} href="#">
            {props.author}
          </a>
        </div>
        <div className={s.album}>
          <a className={s.album__link} href="#">
            {props.album}
          </a>
        </div>
        <div className="track__time">
          <svg
            className={`${s.time__svg} ${isFavorite ? s.time__svg_active : ''} `}
            alt="time"
          >
            <use xlinkHref="../../img/icons/sprite.svg#icon-like" />
          </svg>
          <span className={s.time__text}>{timeFormat(props.time*1000)}</span>
        </div>
      </div>
    </div>
  );
}
