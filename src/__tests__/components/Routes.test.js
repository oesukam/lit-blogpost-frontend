import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../components/Routes';

let wrapper;

describe('Routes.jsx', () => {
  test('should render Routes.jx', () => {
    wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
