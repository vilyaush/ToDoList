import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoThunk, deleteTodoThunk, editStatusThunk, editTodoThunk } from '../../redux/actions/doing';
import { authUserThunk } from '../../redux/actions/user';
import { useEffect } from 'react';

function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const doings = useSelector((state) => state.doings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoThunk())
  })

  useEffect(() => {
    dispatch(authUserThunk())
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

  const totalPages = Math.ceil(doings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Todo/>
      <div className='allToDo'>
          {doings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((el) => (
           <div className="doingList" key={el.id}>
            <div className='doinginpt'>
              <input
                type='checkbox'
                checked={el.status}
                onChange={() => handleEdit(el.id, el.status)}
              />
            <p className='p'>
              {el.title}
              </p>
              </div>
              <div className='doingbtn'>
              <button className='g' type='button' onClick={() => handleEditFormOpen(el.id, el.title, el.status)}>
              ✏️
              </button>
              <button className='r' type='button' onClick={() => handleDelete(el.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

       {editForm.id && (
        <form className='formi' onSubmit={handleEditFormSubmit}>
          <div>
          <input
            className='formiInput'
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
          <input
            type="checkbox"
            checked={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.checked })}
          />
          </div>
          <div>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={handleEditFormClose}>Отмена</button>
          </div>
        </form>
      )}
      
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}

export default TodoList;





