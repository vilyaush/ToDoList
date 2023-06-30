import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoThunk } from '../../redux/actions/doing';

function Todo() {
  const { user } = useSelector((state) => state);
  const [todo, setTask] = useState({ title: '', user_id: ''});

  const dispatch = useDispatch();

  const handleSubmit = (newTask,e) => {
    e.preventDefault();
    dispatch(createTodoThunk(newTask));
    setTask({ title: '', user_id: user.id });
  };

  return (
    <>
     <form className="d-flex">
        <input 
        className="form-control me-2" 
        type="text" 
        value={todo.title || ''} 
        name="title"  
        onChange={(e) => setTask({ title: e.target.value || '', user_id: user.id })} 
        placeholder="задание"/>
        <button 
        className="btn btn-outline-dark"  
        type="submit" 
        onClick={(e) => handleSubmit(todo, e)}>Добавить</button>
     </form>
   </>
  );

};

export default Todo