// const regUser = (data) => ({ type: 'SIGNUP_USER', payload: data });
// // const logOutUser = () => ({ type: 'LOGOUT_USER' });
// // const logInUser = (data) => ({ type: 'SIGNIN_USER', payload: data });
// // const authUser = (data) => ({ type: 'AUTH_USER', payload: data });

// export const regUserThunk = (body) => async (dispatch) => {
//   const response = await fetch(
//     'http://localhost:3003/user/register',
//     {
//       method: 'post',
//       body,
//       credentials: 'include',
//     },
//   );
//   const result = await response.json();
//   dispatch(regUser(result));
// };