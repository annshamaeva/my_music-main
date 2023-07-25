import s from './SkeletonTrackList.module.css';

function SkeletonTrackList() {
  return (
    <div className={s.item}>
      <div className={s.track}>
        <div className={s.title}>
          <div className={s.image} />
          <div className={s.title__skeleton} />
        </div>
        <div className={s.author__skeleton} />
        <div className={s.album__skeleton} />
        <div />
      </div>
    </div>
  );
}

export default SkeletonTrackList;
