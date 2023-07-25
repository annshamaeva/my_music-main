import s from './Search.module.css';

export default function Search() {
  return (
    <div className={s.search}>
      <svg className={s.svg}>
        <use xlinkHref="../../img/icons/sprite.svg#icon-search" />
      </svg>
      <input
        className={s.text}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
