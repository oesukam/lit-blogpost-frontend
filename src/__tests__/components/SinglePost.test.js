import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { postData } from '../../__mocks__/dummy';
import {
  SinglePost,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Post/SinglePost';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([]);
let store;
let wrapper;
const props = {
  post: postData,
  match: { params: {} },
  history: { push: jest.fn() },
  getPost: jest.fn().mockImplementation(() => Promise.resolve(true)),
};
describe('SinglePost.jsx', () => {
  test('should render SinglePost.jx', () => {
    wrapper = shallow(<SinglePost {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should not render article's details", () => {
    const newProps = { ...props };
    newProps.post = {};
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <SinglePost {...newProps} />
      </Provider>,
    );
    expect(wrapper.find('SinglePost').props().post.id).toBeUndefined();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('post');
    });
  });

  describe('actions creators', () => {
    test('should call getPost() action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getPost();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
