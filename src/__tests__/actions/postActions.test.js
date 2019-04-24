import * as actions from '../../actions/postActions';

describe('postActions', () => {
  describe('actions', () => {
    test(`should handle ${actions.setPostLoading}`, () => {
      expect(actions.setPostLoading(true)).toBeTruthy();
    });
  });
});
