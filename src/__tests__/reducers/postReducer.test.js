import * as types from '../../actions-types/postTypes';
import reducer from '../../reducers/postReducer';
import { post as initialState } from '../../store/initialState';

describe('postReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_POST_LOADING}`, () => {
    const action = {
      type: types.SET_POST_LOADING,
      payload: true,
    };
    expect(reducer({}, action)).toEqual({
      loading: true,
    });
  });
});
