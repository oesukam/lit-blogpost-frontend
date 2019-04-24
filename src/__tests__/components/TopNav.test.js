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
  test('should render TopNav.jx', () => {
    wrapper = shallow(<TopNav />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render TopNav.jx', () => {
    wrapper = mount(
      <Router>
        <TopNav {...props} />
      </Router>,
    );
    const component = wrapper.find('TopNav');
    expect(component.props().match).toHaveProperty('url');
    expect(component.state().url).toBe('');
  });

  test('should call componentWillReceiveProps', () => {
    wrapper
      .find('TopNav')
      .instance()
      .componentWillReceiveProps({ match: { url: '/auth/login' } });
    wrapper.update();
    expect(wrapper.find('TopNav').state().url).toBe('/auth/login');
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
