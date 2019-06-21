import * as types from '../../actions-types/userTypes';
import reducer from '../../reducers/userReducer';
import { user as initialState } from '../../store/initialState';

describe('userReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.CLEAR_LOGIN_FORM}`, () => {
    const action = {
      type: types.CLEAR_LOGIN_FORM,
    };
    expect(reducer({}, action)).toEqual({
      loginForm: initialState.loginForm,
    });
  });

  test(`should handle ${types.SET_LOGGING_IN}`, () => {
    const action = {
      type: types.SET_LOGGING_IN,
      payload: true,
    };
    expect(reducer({}, action)).toEqual({
      loggingIn: true,
    });
  });

  test(`should handle ${types.SET_LOGIN_INPUT}`, () => {
    const action = {
      type: types.SET_LOGIN_INPUT,
      payload: { name: 'email', value: 'email@email.com' },
    };
    expect(reducer({}, action)).toEqual({
      loginForm: {
        email: action.payload.value,
      },
      loginFormError: initialState.loginFormError,
    });
  });

  test(`should handle ${types.SET_LOGIN_ERROR}`, () => {
    const action = {
      type: types.SET_LOGIN_ERROR,
      payload: 'FAILED',
    };
    expect(reducer({}, action)).toEqual({
      loginError: action.payload,
    });
  });

  test(`should handle ${types.SET_LOGIN_FORM_ERROR}`, () => {
    const action = {
      type: types.SET_LOGIN_FORM_ERROR,
      payload: { email: true },
    };
    expect(reducer({}, action)).toEqual({
      loginFormError: {
        ...action.payload,
      },
    });
  });

  test(`should handle ${types.SET_USER_DATA}`, () => {
    const action = {
      type: types.SET_USER_DATA,
      payload: {},
    };
    expect(reducer({}, action)).toEqual({
      user: {},
    });
  });
});
