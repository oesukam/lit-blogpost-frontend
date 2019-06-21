import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopNav, mapStateToProps } from '../../components/TopNav/TopNav';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  match: { url: '' },
};
describe('TopNav.jsx', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <TopNav {...props} />
      </Router>,
    );
  });
  test('should render TopNav.jx', () => {
    wrapper = shallow(<TopNav />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render TopNav.jx', () => {
    const component = wrapper.find('TopNav');
    expect(component.props().match).toHaveProperty('url');
    expect(component.state().url).toBe('');
  });

  test('should render TopNav.jx for `/signup`', () => {
    const component = wrapper.find('TopNav').setState({ url: '/signup' });
    expect(component.state().url).toBe('/signup');
  });

  test('should render TopNav.jx for `/login`', () => {
    const component = wrapper.find('TopNav').setState({ url: '/login' });
    expect(component.state().url).toBe('/login');
  });

  test('should render TopNav.jx with user avatar', () => {
    const newProps = { ...props, isAuth: true };
    wrapper = mount(
      <Router>
        <TopNav {...newProps} />
      </Router>,
    );
    const component = wrapper.find('TopNav');
    expect(component.props().isAuth).toBeTruthy();
  });

  test('should call componentWillReceiveProps', () => {
    wrapper
      .find('TopNav')
      .instance()
      .componentWillReceiveProps({ match: { url: '/auth/login' } });
    wrapper.update();
    expect(wrapper.find('TopNav').state().url).toBe('/auth/login');
  });

  describe('when clicking on `hamburger` button', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <TopNav {...props} />
        </Router>,
      );
    });
    test('should toggle `hamburger` state', () => {
      wrapper.find('button[data-el="hamburger"]').simulate('click');
      const component = wrapper.find('TopNav');
      expect(component.state().hamburger).toBeTruthy();
    });
  });

  describe('when props changes', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <TopNav {...props} />
        </Router>,
      );
    });

    test('should render `/auth/login`', () => {
      const url = '/auth/login';
      const component = wrapper.find('TopNav');
      component.setState({ url });
      expect(component.state().url).toBe(url);
    });

    test('should render `/auth/signup`', () => {
      const url = '/auth/signup';
      const component = wrapper.find('TopNav');
      component.setState({ url });
      expect(component.state().url).toBe(url);
    });
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const expectedState = {
        isAuth: false,
        user: {},
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(expectedState);
    });
  });
});
