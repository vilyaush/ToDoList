import React, {useEffect} from 'react'
import Todo from '../Todo/Todo'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoThunk, deleteTodoThunk, EditTodoThunk } from '../../redux/actions/doing';
import { authUserThunk } from '../../redux/actions/user';
import Auth from '../Auth/Auth';
import TodoList from '../TodoList/TodoList';

function Main() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUserThunk())
  })

  return (
    <div className='main'>
    {!user?.id ? <Auth/> : <TodoList/>}
  
    </div>
  )
}

export default Main