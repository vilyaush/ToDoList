import Cookies from 'js-cookie';
const regUser = (data) => ({ type: 'SIGNUP_USER', payload: data });
const logOutUser = () => ({ type: 'LOGOUT_USER' });
const logInUser = (data) => ({ type: 'SIGNIN_USER', payload: data });
const authUser = (data) => ({ type: 'AUTH_USER', payload: data });

export const regUserThunk = (body) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}/user/signup`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    if (result.token) {
      Cookies.set('jwt', result.token, { expires: 0.02 });
    }
    dispatch(regUser(result));
  } catch (error) {
    console.log(error);
  }
};

export const logOutUserThunk = () => async (dispatch) => {
  try {
    Cookies.remove('jwt');
    dispatch(logOutUser());
  } catch (error) {
    console.log(error);
  }
};

export const logInUserThunk = (body) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}/user/signin`,
      {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    const result = await response.json();
    if (result.token) {
      Cookies.set('jwt', result.token, { expires: 0.02 });
    }
    dispatch(logInUser(result));
  } catch (error) {
    console.log(error);
  }
};

export const authUserThunk = () => async (dispatch) => {
  try {
    const token = Cookies.get('jwt');
    if (!token) {
      console.log('not jwt token');
      return;
    }

    const url = `${process.env.REACT_APP_serverApi}/user/auth`;
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });
    const result = await response.json();
    dispatch(authUser(result));
  } catch (error) {
    console.log(error);
  }
};

