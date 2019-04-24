import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

let wrapper;

describe('App.jsx', () => {
  test('should render App.jx', () => {
    wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
