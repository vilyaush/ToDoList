import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { regUserThunk, logInUserThunk } from '../../redux/actions/user';

function Auth() {
  const [loginToggle, setLoginToggle] = useState(false);
  const [form, setForm] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForm = () => {
    setLoginToggle(!loginToggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = form;

    if (
      (loginToggle && email && password) ||
      (!loginToggle && name && email && password && confirmPassword)
    ) {
      if (
        email.length >= 6 &&
        email.length <= 50 &&
        password.length >= 6 &&
        password.length <= 50
      ) {
        if (!loginToggle && (name.length < 0 || name.length > 50)) {
          alert('Имя должно содержать от 6 до 50 знаков');
          return;
        }

        if (!loginToggle && password !== confirmPassword) {
          alert('Пароли не совпадают');
          return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        const data = Object.fromEntries(formData);

        if (loginToggle) {
          dispatch(logInUserThunk(data));
        } else {
          dispatch(regUserThunk(data));
        }

        setForm({});
        setConfirmPassword('');
        event.target.reset();
        navigate('/todo');
      } else {
        alert('Поле Email и пароль должны содержать от 6 до 50 знаков');
      }
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <form className='formAuth' onSubmit={handleSubmit}>
        {!loginToggle ? <h1>Регистрация</h1> : <h1>Авторизация</h1>}
        {!loginToggle && (
          <input
            className='input'
            hidden={loginToggle}
            value={form.name || ''}
            name='name'
            onChange={handleChange}
            placeholder='   Имя'
          />
        )}

        <input
          className='input'
          type='text'
          value={form.email || ''}
          name='email'
          onChange={handleChange}
          placeholder='   Ваш email'
        />
        <input
          className='input'
          type='password'
          value={form.password || ''}
          name='password'
          onChange={handleChange}
          placeholder='   Ваш пароль'
        />
        {!loginToggle && (
          <input
            className='input'
            type='password'
            value={confirmPassword || ''}
            name='confirmPassword'
            onChange={handleConfirmPasswordChange}
            placeholder='   Подтвердите пароль'
          />
        )}
        <label className='container'>
          Уже зарегистрированы?
          <input className='check' type='checkbox' onChange={handleForm} />
        </label>
        <button className='regButton' type='submit'>
          Отправить
        </button>
      </form>
    </>
  );
}

export default Auth;