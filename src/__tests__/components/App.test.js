import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../components/App';

describe('App.jsx', () => {
  test('should render App.jx', () => {
    const renderedValue = renderer.create(<App />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
