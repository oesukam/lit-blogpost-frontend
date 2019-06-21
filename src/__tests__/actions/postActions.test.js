import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/postActions';
import * as types from '../../actions-types/postTypes';
import axios from '../../helpers/axios';

const BASE_URL = process.env.API_URL;
const mockStore = configureMockStore([thunk]);
let store;
jest.setTimeout(30000);

describe('postActions', () => {
  describe('actions', () => {
    test(`should handle setPostLoading`, () => {
      const expectedAction = { type: types.SET_POST_LOADING, payload: true };
      expect(actions.setPostLoading(true)).toEqual(expectedAction);
    });

    test(`should handle setPostsLoading`, () => {
      const expectedAction = { type: types.SET_POSTS_LOADING, payload: true };
      expect(actions.setPostsLoading(true)).toEqual(expectedAction);
    });

    test(`should handle fetchPostFailure`, () => {
      const payload = 'FAILED';
      const expectedAction = { type: types.FETCH_POST_FAILURE, payload };
      expect(actions.fetchPostFailure(payload)).toEqual(expectedAction);
    });

    test(`should handle fetchPostSuccess`, () => {
      const payload = {};
      const expectedAction = {
        type: types.FETCH_POST_SUCCESS,
        payload,
      };
      expect(actions.fetchPostSuccess(payload)).toEqual(expectedAction);
    });

    test(`should handle fetchPostsFailure`, () => {
      const payload = 'FAILED';
      const expectedAction = { type: types.FETCH_POSTS_FAILURE, payload };
      expect(actions.fetchPostsFailure(payload)).toEqual(expectedAction);
    });

    test(`should handle fetchPostsSuccess`, () => {
      const payload = { posts: [] };
      const expectedAction = {
        type: types.FETCH_POSTS_SUCCESS,
        payload,
      };
      expect(actions.fetchPostsSuccess(payload)).toEqual(expectedAction);
    });
  });

  describe('actions thunk', () => {
    beforeEach(() => {
      moxios.install(axios);
      store = mockStore();
    });
    afterEach(() => {
      moxios.uninstall(axios);
    });

    test('should handle fetchPosts() action - FAILURE', () => {
      const expectedActions = [
        {
          type: types.SET_POSTS_LOADING,
          payload: true,
        },
        {
          type: types.FETCH_POSTS_FAILURE,
          payload: 'FAILURE',
        },
        {
          type: types.SET_POSTS_LOADING,
          payload: false,
        },
      ];

      moxios.stubRequest(
        `${BASE_URL}/posts?page=1`,
        {
          status: 500,
          response: {
            message: 'FAILURE',
          },
        },
        5,
      );
      return store.dispatch(actions.fetchPosts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should handle fetchPosts() action - SUCCESS', () => {
      const expectedActions = [
        {
          type: types.SET_POSTS_LOADING,
          payload: true,
        },
        {
          type: types.SET_POSTS_LOADING,
          payload: false,
        },
        {
          type: types.FETCH_POSTS_SUCCESS,
          payload: { posts: [], meta: { page: 1, pages: 1 } },
        },
      ];

      moxios.stubRequest(
        `${BASE_URL}/posts?page=1`,
        {
          status: 200,
          response: {
            posts: [],
            page: 1,
            pages: 1,
          },
        },
        5,
      );
      return store.dispatch(actions.fetchPosts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should handle fetchPost() action - FAILURE', () => {
      const expectedActions = [
        {
          type: types.SET_POST_LOADING,
          payload: true,
        },
        {
          type: types.FETCH_POST_FAILURE,
          payload: 'FAILURE',
        },
        {
          type: types.SET_POST_LOADING,
          payload: false,
        },
      ];

      moxios.stubRequest(
        `${BASE_URL}/posts/1`,
        {
          status: 500,
          response: {
            message: 'FAILURE',
          },
        },
        5,
      );
      return store.dispatch(actions.fetchPost(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test('should handle fetchPost() action - SUCCESS', () => {
      const expectedActions = [
        {
          type: types.SET_POST_LOADING,
          payload: true,
        },
        {
          type: types.SET_POST_LOADING,
          payload: false,
        },
        {
          type: types.FETCH_POST_SUCCESS,
          payload: {},
        },
      ];

      moxios.stubRequest(
        `${BASE_URL}/posts/1`,
        {
          status: 200,
          response: {
            data: {},
          },
        },
        5,
      );
      return store.dispatch(actions.fetchPost(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
