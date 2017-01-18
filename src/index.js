
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import PostView from './containers/PostView';
import CommentView from './containers/CommentView';

import configureStore from './redux/configureStore';

import './index.scss';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>]
        <IndexRedirect to="news/1" />
        <Route path="news/*" component={PostView} />
        <Route path="show/*" component={PostView} />
        <Route path="ask/*" component={PostView} />
        <Route path="jobs/*" component={PostView} />
        <Route path="item/*" component={CommentView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
