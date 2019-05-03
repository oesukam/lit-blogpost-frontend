import * as types from '../actions-types/postTypes';
import axios from '../helpers/axios';

export const setPostsLoading = payload => ({
  type: types.SET_POSTS_LOADING,
  payload,
});

export const fetchPostsSuccess = payload => ({
  type: types.FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = payload => ({
  type: types.FETCH_POSTS_FAILURE,
  payload,
});

export const fetchPosts = ({ page = 1 } = {}) => dispatch => {
  dispatch(setPostsLoading(true));
  return axios
    .get(`/posts?page=${page}`)
    .then(({ data }) => {
      dispatch(setPostsLoading(false));
      dispatch(
        fetchPostsSuccess({
          posts: data.posts,
          meta: { ...data, status: undefined, posts: undefined },
        }),
      );
      return data;
    })
    .catch(err => {
      const { data } = err.response;
      dispatch(fetchPostsFailure(data.message));
      dispatch(setPostsLoading(false));
      return data;
    });
};

export const setPostLoading = payload => ({
  type: types.SET_POST_LOADING,
  payload,
});

export const fetchPostSuccess = payload => ({
  type: types.FETCH_POST_SUCCESS,
  payload,
});

export const fetchPostFailure = payload => ({
  type: types.FETCH_POST_FAILURE,
  payload,
});

export const fetchPost = postId => dispatch => {
  dispatch(setPostLoading(true));
  return axios
    .get(`/posts/${postId}`)
    .then(({ data }) => {
      dispatch(setPostLoading(false));
      dispatch(fetchPostSuccess(data.data));
      return data;
    })
    .catch(err => {
      const { data } = err.response;
      dispatch(fetchPostFailure(data.message));
      dispatch(setPostLoading(false));
      return data;
    });
};
