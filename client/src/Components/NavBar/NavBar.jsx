import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUserThunk } from '../../redux/actions/user';

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUserThunk());
  };
  
  return (
    <div className="navBar">
      <div className='navel'>
      </div>
      <div className='navel'>
        {user && user.id ? <Link to="/" onClick={handleLogout}>Выйти</Link> : null}
      </div>
    </div>
  )
}

export default NavBar