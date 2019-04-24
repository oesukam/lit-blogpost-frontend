import { combineReducers } from 'redux';
import post from './postReducer';
import user from './userReducer';

const reducer = combineReducers({
  post,
  user,
});

export default reducer;
