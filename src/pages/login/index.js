import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../logo_black.png';
import s from './LoginScreen.module.css';
import { useLogInMutation, useGetTokenMutation } from '../../services/user';
import { setUserId, setToken } from '../../store/slices/userSlice';

export default function LoginScreen() {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [mailError, setMailError] = useState('');
  const [passEror, setPassError] = useState('');
  const [logIn] = useLogInMutation();
  const [getToken] = useGetTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleLogin = async () => {
    setMailError('');
    setPassError('');
    try {
      await getToken({
        password: pass,
        email: mail,
      })
        .unwrap()
        .then((data) => {
          dispatch(
            setToken({
              access: data.access,
              refresh: data.refresh,
            })
          );
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);

          navigate('/main');
          logIn({
            password: pass,
            email: mail,
          }).then((response) => {
            dispatch(
              setUserId({
                userID: response.data.id,
              })
            );
            localStorage.setItem('userId', response.data.id);
          });
          setMail('');
          setPass('');
        });
    } catch (error) {
      const errorText = error.data;
      if (errorText.email) {
        setMailError(errorText.email);
      }
      if (errorText.password) {
        setPassError(errorText.password);
      }
      if (errorText.detail) {
        setMailError(errorText.detail);
      }
      setMail('');
      setPass('');
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
            onChange={handleMailChange}
            value={mail}
            className={s.input}
            type="text"
            placeholder="Логин"
          />
          {mailError && <div className={s.error}>{mailError}</div>}
          <input
            onChange={handlePassChange}
            value={pass}
            className={s.input}
            type="password"
            placeholder="Пароль"
          />
          {passEror && <div className={s.error}>{passEror}</div>}
        </div>
        <button onClick={handleLogin} type="button" className={s.enterButton}>
          Войти
        </button>
        <Link to="/registration">
          <button type="button" className={s.button}>
            Зарегестрироваться
          </button>
        </Link>
      </div>
    </div>
  );
}
