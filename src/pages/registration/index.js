import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RegistrationScreen.module.css';
import logo from '../../logo_black.png';
import { useSignUpMutation } from '../../services/user';

export default function RegistrationScreen() {
  const [signUp] = useSignUpMutation();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [loginEror, setLoginError] = useState('');
  const [passEror, setPassError] = useState('');

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPass(e.target.value);
  };

  const handleSignUp = async () => {
    if (pass !== repeatPass) {
      setPassError('Пароли не совпадают');
      setPass('');
      setRepeatPass('');
      return;
    }
    try {
      await signUp({
        username: login,
        password: pass,
        email: 'a1b2@gmail.com',
      }).unwrap();
      navigate('/');
    } catch (error) {
      setLoginError('');
      setPassError('');
      if (error.data) {
        const errorText = error.data;
        if (errorText.username) {
          setLoginError(errorText.username[0]);
        }
        if (errorText.password) {
          setPassError(errorText.password[0]);
        }
        setLogin('');
        setPass('');
        setRepeatPass('');
      }
    }
  };
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.logo}>
          <img className={s.logoImg} src={logo} alt="logo" />
        </div>
        <div className={s.form}>
          <input
            value={login}
            onChange={handleLoginChange}
            className={s.input}
            type="text"
            placeholder="Логин"
          />
          {loginEror && <div className={s.error}>{loginEror}</div>}
          <input
            value={pass}
            onChange={handlePasswordChange}
            className={s.input}
            type="password"
            placeholder="Пароль"
          />
          {passEror ? <div className={s.error}>{passEror}</div> : <div className={s.tip}>Минимум 8 символов</div>}
          <input
            value={repeatPass}
            onChange={handleRepeatPasswordChange}
            className={s.input}
            type="password"
            placeholder="Повоторите пароль"
          />
        </div>

        <button onClick={handleSignUp} type="button" className={s.button}>
          Зарегестрироваться
        </button>
      </div>
    </div>
  );
}
