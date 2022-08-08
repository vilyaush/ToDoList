const getTodo = (data) => ({ type: 'GET_TODO', payload: data });
const createTodo = (data) => ({ type: 'CREATE_TODO', payload: data });

export const getTodoThunk = () => async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_serverApi}/todo`); 
    const result = await response.json();
    dispatch(getTodo(result));
  };

  export const createTodoThunk = (data) => async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}/todo`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    if(response.ok){
   const result = await response.json();
   console.log('ffffffffffffffffffffffffffffff', result, 'jjjjjjjjjjjjjjjjjjjjjjjj');
    dispatch(createTodo(result));
    }
  };