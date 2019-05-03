import * as types from '../actions-types/postTypes';
import { post as initialState } from '../store/initialState';

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_POSTS_LOADING:
      return {
        ...state,
        loadingPosts: payload,
      };
    case types.SET_POST_LOADING:
      return {
        ...state,
        loadingSinglePost: payload,
      };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        message: payload,
      };
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        singlePost: payload,
      };
    case types.FETCH_POST_FAILURE:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
};

export default postReducer;
