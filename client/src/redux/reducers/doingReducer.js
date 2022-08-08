const doingReducer = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_TODO':
            return payload;
        case 'CREATE_TODO':
            return [...state, payload];
  
      default:
        return state;
    }
  };
  
export default doingReducer;