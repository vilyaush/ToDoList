import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoThunk } from '../../redux/actions/doing';

function Todo() {
  const { user } = useSelector((state) => state);
  const [form, setForm] = useState({});
  const [todo, setTask] = useState({ title: '', user_id: ''});

  // const userId = useSelector((state) => state.users.id);

  const dispatch = useDispatch();

  const handleSubmit = (newTask,e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append('title', form.title);
    // // formData.append('user_id', userId);
    // formData.append('status', false);

    // console.log(Object.fromEntries(formData));

    // dispatch(createTodoThunk(formData));
    // setForm({});
    // e.target.reset();
    e.preventDefault();
    dispatch(createTodoThunk(newTask));
    setForm({});
    // navigate('/');
  };
  // const handleChange = (e) => {
  //   setTask({ title: e.target.value });
  // };
  // {(e) => setTask({ text: e.target.value, user_id: user.id })}
//   console.log(e.target.value)

  return (
    <div>
     <form className="d-flex">
        <input className="form-control me-2" type="text" value={todo.title || ''} name="title"  onChange={(e) => setTask({ title: e.target.value || '', user_id: user.id })} placeholder="задание"/>
        <button className="btn btn-outline-dark"  type="submit" onClick={(e) => handleSubmit(todo, e)}>Добавить</button>
     </form>
   </div>
  );

};

export default Todo