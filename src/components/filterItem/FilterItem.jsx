import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, removeFilter } from '../../store/slices/filterSlice';
import s from './FilterItem.module.css';

export default function FilterItem(props) {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);
  const dispatch = useDispatch();
  const { filterList } = useSelector((state) => state.filter);

  const handleClick = (e) => {
    toggleActive();
    if (!active) {
      dispatch(setFilter(e.target.textContent));
    } else {
      dispatch(removeFilter(e.target.textContent));
    }
  };

  useEffect(() => {
    if (filterList.filter((item) => item === props.item)[0]) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <p
      role="presentation"
      onKeyDown={toggleActive}
      key={props.item.toString()}
      onClick={handleClick}
      className={`${s.item} ${active ? s.active : ''}`}
    >
      {props.item}
    </p>
  );
}
