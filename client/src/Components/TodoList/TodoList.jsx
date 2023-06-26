import React, {useEffect, useState} from 'react'
import Todo from '../Todo/Todo'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoThunk, deleteTodoThunk, editStatusThunk } from '../../redux/actions/doing';

function TodoList() {
  const doings = useSelector((state) => state.doings);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoThunk());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleEdit = (id, status) => {
  dispatch(editStatusThunk(id, status))
  };
  

  return (
    <div >
   <Todo/>
   <div className='allToDo'>
   {doings.map((el) => (
     <div className="doingList" key={el.id}>
       <p>
         {el.title}
         <input type='checkbox'onClick={() => handleEdit(el.id, el.status)}/>
         <button type='submit' >Редактировать</button>
         <button type='button' onClick={() => handleDelete(el.id)}>Удалить</button>
         </p>
       
       </div>
      ))}
      </div>
    </div>
  )
}


export default TodoList