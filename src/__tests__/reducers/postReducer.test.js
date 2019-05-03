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
      loadingSinglePost: true,
    });
  });

  test(`should handle ${types.SET_POSTS_LOADING}`, () => {
    const action = {
      type: types.SET_POSTS_LOADING,
      payload: true,
    };
    expect(reducer({}, action)).toEqual({
      loadingPosts: true,
    });
  });

  test(`should handle ${types.FETCH_POST_FAILURE}`, () => {
    const action = {
      type: types.FETCH_POST_FAILURE,
      payload: 'FAILED',
    };
    expect(reducer({}, action)).toEqual({
      message: 'FAILED',
    });
  });

  test(`should handle ${types.FETCH_POST_SUCCESS}`, () => {
    const action = {
      type: types.FETCH_POST_SUCCESS,
      payload: {},
    };
    expect(reducer({}, action)).toEqual({
      singlePost: {},
    });
  });

  test(`should handle ${types.FETCH_POSTS_FAILURE}`, () => {
    const action = {
      type: types.FETCH_POSTS_FAILURE,
      payload: 'FAILED',
    };
    expect(reducer({}, action)).toEqual({
      message: 'FAILED',
    });
  });

  test(`should handle ${types.FETCH_POSTS_SUCCESS}`, () => {
    const action = {
      type: types.FETCH_POSTS_SUCCESS,
      payload: { posts: [] },
    };
    expect(reducer({}, action)).toEqual({
      posts: [],
    });
  });
});
