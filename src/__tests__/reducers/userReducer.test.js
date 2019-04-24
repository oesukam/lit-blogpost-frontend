import * as types from '../../actions-types/userTypes';
import reducer from '../../reducers/userReducer';
import { user as initialState } from '../../store/initialState';

describe('userReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_USER_LOGGING_IN}`, () => {
    const action = {
      type: types.SET_USER_LOGGING_IN,
      payload: true,
    };
    expect(reducer({}, action)).toEqual({
      loggingIn: true,
    });
  });
});
