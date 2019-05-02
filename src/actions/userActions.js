import * as types from '../actions-types/userTypes';
import axios from '../helpers/axios';

export const setLoggingIn = payload => ({
  type: types.SET_LOGGING_IN,
  payload,
});

export const setUserData = payload => ({
  type: types.SET_USER_DATA,
  payload,
});

export const handleLoginInput = payload => ({
  type: types.SET_LOGIN_INPUT,
  payload,
});

export const setLoginError = payload => ({
  type: types.SET_LOGIN_ERROR,
  payload,
});

export const setLoginFormError = payload => ({
  type: types.SET_LOGIN_FORM_ERROR,
  payload,
});

export const validateLoginInput = payload => dispatch =>
  new Promise(resolve => {
    const errors = {};
    let hasError = false;
    Object.keys(payload).forEach(key => {
      if (key === 'email') {
        errors[key] = !/\S+@\S+\.\S+/.test(payload[key]);
      } else {
        errors[key] = payload[key] === '';
      }
      if (errors[key]) {
        hasError = true;
      }
    });
    dispatch(setLoginFormError(errors));
    resolve(hasError);
  });

export const submitLogin = formData => dispatch => {
  dispatch(setLoggingIn(true));
  dispatch(setLoginError(''));
  return axios
    .post('/auth/login', formData)
    .then(res => {
      const { token, data } = res.data;
      localStorage.setItem('token', token);
      dispatch(setUserData({ ...data, token }));
      dispatch(setLoggingIn(false));
      return res;
    })
    .catch(err => {
      const { message } = err.response.data;
      dispatch(setLoginError(message));
      dispatch(setLoggingIn(false));
      return err;
    });
};
