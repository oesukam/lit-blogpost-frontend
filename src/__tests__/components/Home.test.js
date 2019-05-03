import React from 'react';
import { shallow } from 'enzyme';
import {
  Home,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Home/Home';
import { postData } from '../../__mocks__/dummy';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  posts: [postData],
  match: { params: {} },
  history: { push: jest.fn() },
  getPosts: jest.fn().mockImplementation(() => Promise.resolve(true)),
  meta: {
    page: 1,
    pages: 1,
  },
};
describe('Home.jsx', () => {
  test('should render Home.jx', () => {
    wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('posts');
      expect(state).toHaveProperty('meta');
    });
  });

  describe('actions creators', () => {
    test('should call getPosts() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getPosts();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
