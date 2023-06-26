const doingReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_TODO':
            return payload;
        case 'CREATE_TODO':
            return [...state, payload];
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== payload);
        case 'EDIT_STATUS':
            return state.map((todo) => {
              if (todo.id === payload.status.id) {
                return { ...todo, status: payload.status };
              }
              return todo;
            });
        case 'EDIT_TODO':
            return state.map((todo) => {
              if (todo.id === payload.id) {
              return { ...todo, ...payload.data };
            }
              return todo;
            });
      default:
        return state;
    }
  };
  
export default doingReducer;

