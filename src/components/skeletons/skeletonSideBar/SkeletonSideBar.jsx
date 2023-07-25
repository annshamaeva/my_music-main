import s from './SkeletonSideBar.module.css';

function SkeletonSideBar() {
  return (
    <div className={s.sidebar}>
      <div className={s.block}>
        <div className={s.list}>
          <div className={s.skeleton} />
          <div className={s.skeleton} />
          <div className={s.skeleton} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonSideBar;
