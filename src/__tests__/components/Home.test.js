import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';

let wrapper;

describe('Home.jsx', () => {
  test('should render Home.jx', () => {
    wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
