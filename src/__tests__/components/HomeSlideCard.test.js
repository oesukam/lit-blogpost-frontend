import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import HomeSlideCard from '../../components/common/HomeSlideCard/HomeSlideCard';

let wrapper;
const props = {
  title: 'title',
  cover: '',
  createdAt: '',
  history: { push: jest.fn() },
};

describe('HomeSlideCard.jsx', () => {
  test('should render Home.jx', () => {
    wrapper = shallow(<HomeSlideCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on navigate', () => {
    beforeEach(() => {
      wrapper = mount(<HomeSlideCard {...props} />);
    });

    test("should call `navigateTo()` method's instance", () => {
      wrapper.find('h1.slide-card__title').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
