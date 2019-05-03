import React from 'react';
import { shallow, mount } from 'enzyme';
import PostCard from '../../../components/common/PostCard/PostCard';

let wrapper;
const props = {
  title: 'title',
  cover: '',
  createdAt: '',
  history: { push: jest.fn() },
};

describe('<PostCard />', () => {
  test('Should render the <Input />', () => {
    wrapper = shallow(<PostCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on navigate', () => {
    beforeEach(() => {
      wrapper = mount(<PostCard {...props} />);
    });

    test("should call `navigateTo()` method's instance", () => {
      wrapper.find('div[role="presentation"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
