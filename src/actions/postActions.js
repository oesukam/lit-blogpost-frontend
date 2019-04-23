import * as types from '../actions-types/postTypes';

export const setPostLoading = payload => ({
  type: types.SET_POST_LOADING,
  payload,
});
