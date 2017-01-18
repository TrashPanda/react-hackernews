import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// NOTE: fix this ugly import later in webpack config
import dataReducer, {fetchPostsEpic, fetchCommentsEpic} from './hnApi';
import currentPostReducer from './currentPost';

export const rootEpic = combineEpics(
  fetchPostsEpic,
  fetchCommentsEpic
);

export const rootReducer = combineReducers({
  data: dataReducer,
  currentPost: currentPostReducer,
  routing: routerReducer  // this one is special, for routing
});
