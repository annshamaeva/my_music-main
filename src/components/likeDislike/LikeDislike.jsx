import { useState, useEffect } from 'react';
import s from './LikeDislike.module.css';

export default function LikeDislike({
  onLikeClick,
  onDislikeClick,
  isFavorite,
}) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(true);
    onLikeClick();
  };
  const handleDislikeClick = () => {
    setLiked(false);
    onDislikeClick();
  };

  useEffect(() => {
    if (isFavorite) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [isFavorite]);

  return (
    <div className={s.like_dis}>
      <div className={s.like}>
        <svg
          className={`${s.like__svg} ${liked ? s.active : ''}`}
          alt="like"
          onClick={handleLikeClick}
        >
          <use xlinkHref="../../img/icons/sprite.svg#icon-like" />
        </svg>
      </div>
      <div className={s.dislike}>
        <svg
          className={s.dislike__svg}
          alt="dislike"
          onClick={handleDislikeClick}
        >
          <use xlinkHref="../../img/icons/sprite.svg#icon-dislike" />
        </svg>
      </div>
    </div>
  );
}
