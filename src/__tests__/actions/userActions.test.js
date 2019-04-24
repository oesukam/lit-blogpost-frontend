import * as actions from '../../actions/userActions';

describe('userActions', () => {
  describe('actions', () => {
    test(`should handle ${actions.setUserLoggingIn}`, () => {
      expect(actions.setUserLoggingIn(true)).toBeTruthy();
    });
  });
});
