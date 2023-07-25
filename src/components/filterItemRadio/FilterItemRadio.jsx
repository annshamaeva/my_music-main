import { useDispatch, useSelector } from 'react-redux';
import { setDateFilter } from '../../store/slices/filterSlice';
import s from './FilterItemRadio.module.css';

export default function FilterItemRadio() {
  const dispatch = useDispatch();
  const { dateFilter } = useSelector((state) => state.filter);
  const handleClick = (e) => {
    dispatch(setDateFilter(e.target.value))
  }
  return (
    <>
      <label className={s.item} htmlFor="newer">
        <input
          className="radio-input"
          type="radio"
          name="year-filter"
          id="newer"
          value="newer"
          checked={dateFilter === 'newer'}
          onChange={handleClick}
        />
        более новые
      </label>
      <label className={s.item} htmlFor="older">
        <input
          className="radio-input"
          type="radio"
          name="year-filter"
          id="older"
          value="older"
          checked={dateFilter === 'older'}
          onChange={handleClick}
        />
        более старые
      </label>
    </>
  );
}
