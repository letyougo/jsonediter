import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import JsonEditor from './routes/JsonEditor';
import RewriteURL from './routes/RewriteURL';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRoute component={JsonEditor} />
        <Route path="json-editor" component={JsonEditor} />
        <Route path="rewirite-url" component={RewriteURL} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
