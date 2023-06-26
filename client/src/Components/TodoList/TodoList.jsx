// import React, {useEffect} from 'react'
// import Todo from '../Todo/Todo'
// import { useSelector, useDispatch } from 'react-redux';
// import { getTodoThunk, deleteTodoThunk, editStatusThunk} from '../../redux/actions/doing';

// function TodoList() {
//   const doings = useSelector((state) => state.doings);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTodoThunk());
//   }, []);

//   const handleDelete = (id) => {
//     dispatch(deleteTodoThunk(id));
//   };

//   const handleEdit = (id, status) => {
//     dispatch(editStatusThunk(id, !status));
//     dispatch({ type: 'EDIT_STATUS', payload: { status: { id, status: !status } } });
//   };
  

//   return (
//     <div >
//    <Todo/>
//    <div className='allToDo'>

//    {doings.map((el) => (
//      <div className="doingList" key={el.id}>
//        <p>
//          {el.title}
//          <input type='checkbox' checked={el.status} onChange={() => handleEdit(el.id, el.status)}/>
//          <button type='submit' >Редактировать</button>
//          <button type='button' onClick={() => handleDelete(el.id)}>Удалить</button>
//          </p>
       
//        </div>
//       ))}
//       </div>
//     </div>
//   )
// }


// export default TodoList;

import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoThunk, deleteTodoThunk, editStatusThunk, editTodoThunk } from '../../redux/actions/doing';
import { useEffect } from 'react';

function TodoList() {
  const doings = useSelector((state) => state.doings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoThunk())
  })

  const handleDelete = (id) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleEdit = (id, status) => {
    dispatch(editStatusThunk(id, !status));
  };

  const handleEditSubmit = (id, updatedData) => {
    dispatch(editTodoThunk(id, updatedData));
  };

  const [editForm, setEditForm] = useState({ id: null, title: '', status: false });

  const handleEditFormOpen = (id, title, status) => {
    setEditForm({ id, title, status });
  };

  const handleEditFormClose = () => {
    setEditForm({ id: null, title: '', status: false });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit(editForm.id, { title: editForm.title, status: editForm.status });
    handleEditFormClose();
  };

  return (
    <div>
      <Todo />
      <div className='allToDo'>
        {doings.map((el) => (
          <div className="doingList" key={el.id}>
            <p>
              {el.title}
              <input
                type='checkbox'
                checked={el.status}
                onChange={() => handleEdit(el.id, el.status)}
              />
              <button type='button' onClick={() => handleEditFormOpen(el.id, el.title, el.status)}>
                Редактировать
              </button>
              <button type='button' onClick={() => handleDelete(el.id)}>Удалить</button>
            </p>
          </div>
        ))}
      </div>

      {editForm.id && (
        <form onSubmit={handleEditFormSubmit}>
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
          <input
            type="checkbox"
            checked={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.checked })}
          />
          <button type="submit">Сохранить</button>
          <button type="button" onClick={handleEditFormClose}>Отмена</button>
        </form>
      )}
    </div>
  );
}

export default TodoList;





