import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/userActions';
import * as types from '../../actions-types/userTypes';
import axios from '../../helpers/axios';

const BASE_URL = process.env.API_URL;
const mockStore = configureMockStore([thunk]);
let store;
jest.setTimeout(30000);

describe('userActions', () => {
  describe('actions', () => {
    test(`should handle setLoggingIn()`, () => {
      expect(actions.setLoggingIn(true)).toBeTruthy();
    });

    test(`should handle handleLoginInput()`, () => {
      const payload = { name: 'email', value: 'email@email.com' };
      const expectedAction = {
        type: types.SET_LOGIN_INPUT,
        payload,
      };
      expect(actions.handleLoginInput(payload)).toEqual(expectedAction);
    });

    test(`should handle setUserData()`, () => {
      const payload = { username: 'username', email: 'email@email.com' };
      const expectedAction = {
        type: types.SET_USER_DATA,
        payload,
      };
      expect(actions.setUserData(payload)).toEqual(expectedAction);
    });

    test(`should handle setLoginError()`, () => {
      const payload = 'FAILED';
      const expectedAction = {
        type: types.SET_LOGIN_ERROR,
        payload,
      };
      expect(actions.setLoginError(payload)).toEqual(expectedAction);
    });

    test(`should handle setLoginFormError()`, () => {
      const payload = { email: true };
      const expectedAction = {
        type: types.SET_LOGIN_FORM_ERROR,
        payload,
      };
      expect(actions.setLoginFormError(payload)).toEqual(expectedAction);
    });
  });

  describe('thunks', () => {
    beforeEach(() => {
      moxios.install(axios);
      store = mockStore();
    });
    afterEach(() => {
      moxios.uninstall(axios);
    });

    test(`should handle submitLogin() -FAILURE`, () => {
      const payload = {
        email: 'email@email.com',
        password: 'password',
      };
      const expectedAction = [
        {
          type: types.SET_LOGGING_IN,
          payload: true,
        },
        {
          type: types.SET_LOGIN_ERROR,
          payload: '',
        },
        {
          type: types.SET_LOGIN_ERROR,
          payload: 'FAILED',
        },
        {
          type: types.SET_LOGGING_IN,
          payload: false,
        },
      ];
      moxios.stubRequest(`${BASE_URL}/auth/login`, {
        status: 400,
        response: {
          message: 'FAILED',
        },
      });
      return store.dispatch(actions.submitLogin(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    test(`should handle submitLogin() -SUCCESS`, () => {
      const payload = {
        email: 'email@email.com',
        password: 'password',
      };
      const expectedAction = [
        {
          type: types.SET_LOGGING_IN,
          payload: true,
        },
        {
          type: types.SET_LOGIN_ERROR,
          payload: '',
        },
        {
          type: types.SET_USER_DATA,
          payload: { ...payload, token: 'token' },
        },
        {
          type: types.SET_LOGGING_IN,
          payload: false,
        },
      ];
      moxios.stubRequest(`${BASE_URL}/auth/login`, {
        status: 200,
        response: {
          message: 'SUCCESS',
          data: payload,
          token: 'token',
        },
      });
      return store.dispatch(actions.submitLogin(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    test(`should handle validateLoginInput()`, () => {
      const payload = { email: 'email@email.com' };
      const expectedAction = [
        {
          type: types.SET_LOGIN_FORM_ERROR,
          payload: { email: false },
        },
      ];
      return store.dispatch(actions.validateLoginInput(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    test(`should handle validateLoginInput() - wrong email`, () => {
      const payload = { email: '' };
      const expectedAction = [
        {
          type: types.SET_LOGIN_FORM_ERROR,
          payload: { email: true },
        },
      ];
      return store.dispatch(actions.validateLoginInput(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    test(`should handle validateLoginInput() - password`, () => {
      const payload = { password: '' };
      const expectedAction = [
        {
          type: types.SET_LOGIN_FORM_ERROR,
          payload: { password: true },
        },
      ];
      return store.dispatch(actions.validateLoginInput(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
