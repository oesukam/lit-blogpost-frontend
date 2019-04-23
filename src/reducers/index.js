import { combineReducers } from 'redux';
import post from './postReducer';

const reducer = combineReducers({
  post,
});

export default reducer;
