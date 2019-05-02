import * as types from '../actions-types/userTypes';
import { user as initialState } from '../store/initialState';

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CLEAR_LOGIN_FORM:
      return {
        ...state,
        loginForm: initialState.loginForm,
      };
    case types.SET_LOGGING_IN:
      return {
        ...state,
        loggingIn: payload,
      };
    case types.SET_LOGIN_INPUT:
      return {
        ...state,
        loginForm: { ...state.loginForm, [payload.name]: payload.value },
        loginFormError: initialState.loginFormError,
      };
    case types.SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: payload,
      };
    case types.SET_LOGIN_FORM_ERROR:
      return {
        ...state,
        loginFormError: { ...state.loginFormError, ...payload },
      };
    default:
      return state;
  }
};

export default userReducer;
