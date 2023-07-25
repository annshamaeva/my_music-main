import s from './PlayerControls.module.css';

export default function PlayerControls({
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  onRepeatClick,
  onShuffleClick,
  isPlay,
  isRepeat,
  isShuffle,
}) {
  return (
    <div className={s.controls}>
      <div className={s.prev}>
        <svg className={s.prev__svg} alt="prev" onClick={onPrevClick}>
          <use xlinkHref="../../img/icons/sprite.svg#icon-prev" />
        </svg>
      </div>
      <div className={s.play} role="presentation" onClick={onPlayPauseClick}>
        <svg className={s.play__svg} alt="play">
          {isPlay ? (
            <use xlinkHref="../../img/icons/sprite.svg#icon-pause" />
          ) : (
            <use xlinkHref="../../img/icons/sprite.svg#icon-play" />
          )}
        </svg>
      </div>
      <div className={s.next}>
        <svg className={s.next__svg} alt="next" onClick={onNextClick}>
          <use xlinkHref="../../img/icons/sprite.svg#icon-next" />
        </svg>
      </div>
      <div className={s.repeat}>
        <svg
          className={`${isRepeat ? s.repeat__svg_active : s.repeat__svg}`}
          alt="repeat"
          onClick={onRepeatClick}
        >
          <use xlinkHref="../../img/icons/sprite.svg#icon-repeat" />
        </svg>
      </div>
      <div className={s.shuffle}>
        <svg
          className={`${isShuffle ? s.shuffle__svg_active : s.shuffle__svg}`}
          alt="shuffle"
          onClick={onShuffleClick}
        >
          <use xlinkHref="../../img/icons/sprite.svg#icon-shuffle" />
        </svg>
      </div>
    </div>
  );
}
