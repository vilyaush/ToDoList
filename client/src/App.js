import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Components/Auth/Auth';
import TodoList from './Components/TodoList/TodoList';
import { authUserThunk } from './redux/actions/user';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUserThunk())
  },[dispatch])
  return (
    <div className="App">
    <NavBar/>
    <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path='/todo' element={<TodoList/>}/>
      </Routes>
    </div>
  );
}

export default App;