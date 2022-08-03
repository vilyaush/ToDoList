const doingReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_TODO':
            return payload;
        case 'CREATE_TODO':
            return [payload.newTodo, ...state];
  
      default:
        return state;
    }
  };
  
export default doingReducer;