import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoThunk } from '../../redux/actions/doing';

function Todo() {
  const [form, setForm] = useState({});

//   const userId = useSelector((state) => state.users.id);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    // formData.append('user_id', userId);
    formData.append('status', false);

    dispatch(createTodoThunk(formData));
    setForm({});
    e.target.reset();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
//   console.log(e.target.value)

  return (
    <div>
     <form className="d-flex" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="text" value={form.title || ''} name="title" onChange={handleChange} placeholder="задание"/>
        <button className="btn btn-outline-dark" type="submit">Добавить</button>
     </form>
    
    </div>
  );

};

export default Todo