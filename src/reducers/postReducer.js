import * as types from "../actions-types/postTypes";
import { post as initialState } from "../store/initialState";

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_POST_LOADING:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

export default postReducer;
