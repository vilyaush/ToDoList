import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUserThunk } from '../../redux/actions/user';



function NavBar() {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUserThunk());
  };
  
  return (
    <div className="navBar">
      <div className='navel'>
        {user.user && user.user?.id ? <h1>{user.user.name}</h1> : <h1>TODO</h1>}
        {user?.user && user.user?.id ? <Link to="/" onClick={handleLogout} className='btn'>Выйти</Link> : <Link to="/auth" className='btn'>Вoйти</Link>}
      </div>
    </div>
  )
}

export default NavBar