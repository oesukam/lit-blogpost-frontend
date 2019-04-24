import * as types from '../actions-types/userTypes';
import { user as initialState } from '../store/initialState';

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_USER_LOGGING_IN:
      return {
        ...state,
        loggingIn: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
