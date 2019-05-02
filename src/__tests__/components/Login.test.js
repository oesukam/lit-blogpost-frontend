import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Login,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Auth/Login/Login';
import { user as initialState } from '../../store/initialState';

let wrapper;
const props = {
  loginForm: initialState.loginForm,
  loginFormError: initialState.loginFormError,
  loggingIn: false,
  loginError: '',
  submitLoginForm: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ status: 200 })),
  validateInput: jest.fn().mockImplementation(() => Promise.resolve(false)),
  handleInput: jest.fn(),
  clearError: jest.fn(),
  history: { push: jest.fn() },
};
describe('<Login />', () => {
  test('should render <Login />', () => {
    wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render login button loader', () => {
    const newProps = { ...props, loggingIn: true };
    wrapper = mount(<Login {...newProps} />);
    expect(wrapper.props().loggingIn).toBeTruthy();
  });

  test('should render email error', () => {
    const newProps = { ...props, loginFormError: { email: true } };
    wrapper = mount(<Login {...newProps} />);
    expect(wrapper.props().loginFormError.email).toBeTruthy();
  });

  test('should render password error', () => {
    const newProps = { ...props, loginFormError: { password: true } };
    wrapper = mount(<Login {...newProps} />);
    expect(wrapper.props().loginFormError.password).toBeTruthy();
  });

  test('should render notification', () => {
    const newProps = { ...props, loginError: 'failed' };
    wrapper = mount(<Login {...newProps} />);
    expect(wrapper.props().loginError).toBe('failed');
  });

  describe('when clicking on `submit button`', () => {
    beforeEach(() => {
      wrapper = mount(<Login {...props} />);
    });

    test('should call validateInput() function', () => {
      wrapper.find('button[data-el="login-btn"]').simulate('click');
      expect(props.validateInput).toHaveBeenCalled();
    });

    test('should call submitLoginForm() function', () => {
      const newProps = {
        ...props,
        validateInput: jest
          .fn()
          .mockImplementation(() => Promise.resolve(true)),
      };
      wrapper = mount(<Login {...newProps} />);
      wrapper.find('button[data-el="login-btn"]').simulate('click');
      expect(props.submitLoginForm).toHaveBeenCalled();
    });

    test('should call submitLoginForm() function', () => {
      const newProps = {
        ...props,
        validateInput: jest
          .fn()
          .mockImplementation(() => Promise.resolve(false)),
        submitLoginForm: jest
          .fn()
          .mockImplementation(() => Promise.resolve({ status: 401 })),
      };
      wrapper = mount(<Login {...newProps} />);
      wrapper.find('button[data-el="login-btn"]').simulate('click');
      expect(props.submitLoginForm).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loggingIn');
      expect(state).toHaveProperty('loginForm');
    });
  });

  describe('actions creators', () => {
    test('should call submitLoginForm() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).submitLoginForm();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call handleInput() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).handleInput({
        target: { name: 'email', value: 'value' },
      });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call validateInput() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).validateInput({
        email: 'email@email.com',
      });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call clearError() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).clearError();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
