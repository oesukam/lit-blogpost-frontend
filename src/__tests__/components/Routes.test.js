import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import { Routes, mapStateToProps } from '../../components/Routes';
import initialState from '../../store/initialState';

let store;
const mockStore = configureMockStore([thunk]);
let wrapper;

describe('Routes.jsx', () => {
  test('should render Routes.jx', () => {
    wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('render routes', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    test('should show Home component for `/`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes isAuth />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    test('should show redirect to `/` for `/login`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes isAuth />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    test('should show Login for `/login`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('Login')).toHaveLength(1);
    });
  });

  describe('reducers', () => {
    test('should return initial props', () => {
      expect(mapStateToProps(initialState)).toEqual({
        isAuth: false,
      });
    });
  });
});
