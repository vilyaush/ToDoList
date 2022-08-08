import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logOutUserThunk } from '../../redux/action/user';

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const handleLogout = () => {
  //   dispatch(logOutUserThunk());
  // };
  
  return (
    <div className="navBar">

    <div className="headNav">
      <li>
        <Link to="/">Главная</Link>
      </li>
      <li><Link to="/auth">Войти</Link></li>
    </div>
  </div>
  )
}

export default NavBar