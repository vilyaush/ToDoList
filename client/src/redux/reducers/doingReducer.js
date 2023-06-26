const doingReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_TODO':
            return payload;
        case 'CREATE_TODO':
            return [...state, payload];
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== payload);
        case 'EDIT_TODO':
          const todo = state.find((el) => el.id === payload.id);
          todo.status = payload.status
          return {...state }
      default:
        return state;
    }
  };
  
export default doingReducer;