const userReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'SIGNIN_USER':
        return payload;
      case 'SIGNUP_USER':
        return payload;
      case 'LOGOUT_USER':
        return state = null;
      case 'AUTH_USER':
        return payload;
  
      default:
        return state;
    }
  };
  
  export default userReducer;