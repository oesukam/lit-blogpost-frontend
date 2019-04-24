import * as types from '../actions-types/userTypes';

export const setUserLoggingIn = payload => ({
  type: types.SET_USER_LOGGING_IN,
  payload,
});
