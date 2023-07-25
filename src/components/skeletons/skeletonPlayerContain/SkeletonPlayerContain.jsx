import s from './SkeletonPlayerContain.module.css';

function SkeletonPlayerContain() {
  return (
    <div className={s.contain}>
      <div className={s.image} />
      <div className={s.skeleton} />
      <div className={s.skeleton} />
    </div>
  );
}

export default SkeletonPlayerContain;
