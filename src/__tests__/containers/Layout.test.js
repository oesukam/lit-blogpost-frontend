import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../containers/Layout';

let wrapper;

describe('Layout.jsx', () => {
  test('should render Layout.jx', () => {
    wrapper = shallow(<Layout />);
    expect(wrapper).toMatchSnapshot();
  });
});
