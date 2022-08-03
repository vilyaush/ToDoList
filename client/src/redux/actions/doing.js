const getTodo = (data) => ({ type: 'GET_TODO', payload: data });
const createTodo = (data) => ({ type: 'CREATE_TODO', payload: data });

export const getTodoThunk = () => async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_serverApi}/todo`); 
    const result = await response.json();
    dispatch(getTodo(result));
  };

  export const createTodoThunk = (body) => async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}/todo`,
      {
        credentials: 'include',
        method: 'POST',
        body,
      },
    );
    const result = await response.json();
    dispatch(createTodo(result));
  };