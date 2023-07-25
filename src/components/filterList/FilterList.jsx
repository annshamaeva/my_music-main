import FilterItem from '../filterItem/FilterItem';
import FilterItemRadio from '../filterItemRadio/FilterItemRadio';
import s from './FilterList.module.css';

export default function FilterList(props) {
  const list =
    props.list &&
    props.list.map((item) => <FilterItem key={item.toString()} item={item} />);

  function handleClose(e) {
    e.stopPropagation();
  }

  return (
    <div
      role="presentation"
      onKeyDown={handleClose}
      onClick={handleClose}
      className={props.class}
    >
      {props.mode === 'radio' ? (
        <div className={s.genre}>
          <FilterItemRadio />
        </div>
      ) : (
        <div className={s.content}>{list}</div>
      )}
    </div>
  );
}
