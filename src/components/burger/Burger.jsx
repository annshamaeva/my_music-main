import s from './Burger.module.css';

export default function Burger(props) {
  return (
    <div
      role="presentation"
      onKeyDown={props.onClick}
      onClick={props.onClick}
      className={s.burger}
    >
      <span className={s.line} />
      <span className={s.line} />
      <span className={s.line} />
    </div>
  );
}
