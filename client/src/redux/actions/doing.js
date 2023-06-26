const getTodo = (data) => ({ type: 'GET_TODO', payload: data });
const createTodo = (data) => ({ type: 'CREATE_TODO', payload: data });
const deleteTodo = (id) => ({type: 'DELETE_TODO', payload: id})
const editStatus = (status) => ({type: 'EDIT_STATUS', payload: {status}})
const editTodo = (id, data) => ({ type: 'EDIT_TODO', payload: { id, data } });

export const getTodoThunk = () => async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_serverApi}/todo`); 
    const result = await response.json();
    dispatch(getTodo(result));
  };

export const createTodoThunk = (data) => async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}/todo`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    );
    if(response.ok){
   const result = await response.json();
    dispatch(createTodo(result));
    }
  };

export const deleteTodoThunk = (id) => async (dispatch) => {
  const response = await fetch(
    `${process.env.REACT_APP_serverApi}/todo/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  if (response.status === 200) {
    dispatch(deleteTodo(id));
  }
};

export const editStatusThunk = (id, status) => async (dispatch) => {
  const response = await fetch(
    `${process.env.REACT_APP_serverApi}/todo/status/${id}`,
    {
      method: 'PATCH',
      headers: {
      'Content-type': 'application/json'
     },
      body: JSON.stringify({status}),
      credentials: 'include',
    },
  );
  if(response.ok) {
    const result = await response.json();
    dispatch(editStatus({id, status: result.status}))
  }
}

export const editTodoThunk = (id, data) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_serverApi}/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      const result = await response.json();
      dispatch(editTodo(id, result));
    } else {
      // Handle error case
      console.error('Failed to update todo');
    }
  } catch (error) {
    console.error(error);
    // Handle error case
  }
};