import reducers from '../../reducers';
import initialState from '../../store/initialState';

describe('root reducer', () => {
  test("should return combined reducers'state", () => {
    expect(reducers(undefined, {})).toEqual(initialState);
  });
});
