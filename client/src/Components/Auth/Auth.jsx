import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regUserThunk, logInUserThunk, logOutUserThunk } from '../../redux/actions/user';

function Auth() {
  const [loginToggle, setLoginToggle] = useState(false);
  const [form, setForm] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // console.log(user);

  const handleForm = () => {
    setLoginToggle(!loginToggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loginToggle && form.email && form.password) {
      dispatch(logInUserThunk(form));

      setForm({});
      event.target.reset();
      navigate('/');
    } else if (form.name && form.email && form.password) {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);

      console.log(Object.fromEntries(formData))
      dispatch(regUserThunk(formData));

      setForm({});
      event.target.reset();
      navigate('/');
    }
  };

  // const handleLogout = () => {
  //   dispatch(logOutUserThunk());
  // };

  const handleChange = (e) => {

      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
  };

  return (
    <div className="fon">
      <div className="formAuth">
        <h1>Регистрация</h1>
        <form className="formAuth" onSubmit={handleSubmit}>
          <input
            className="input"
            hidden={loginToggle}
            value={form.name || ''}
            name="name"
            onChange={handleChange}
            placeholder="Имя"
          />

          <input
            className="input"
            type="text"
            value={form.email || ''}
            name="email"
            onChange={handleChange}
            placeholder="Ваш email"
          />
          <input
            className="input"
            type="password"
            value={form.password || ''}
            name="password"
            onChange={handleChange}
            placeholder="Ваш пароль"
          />

          <label className="container">
            Уже зарегестрированы?
            <input className="check" type="checkbox" onChange={handleForm} />
          </label>

          <button className="regButton" type="submit">{loginToggle ? 'Войти' : 'Зарегистрироваться'}</button>
          {/* <button className="regButton" type="submit" onClick={handleLogout}> Выйти</button> */}
        </form>
      </div>
    </div>
  );
}

export default Auth;