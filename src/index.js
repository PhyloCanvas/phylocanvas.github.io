import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history';
import { Router, RoutingContext, match } from 'react-router';

import routes from './routes';
import documentTemplate from './document';

// Client render (optional):
if (typeof document !== 'undefined') {
  require('./css/styles.css');

  const history = createHistory();
  ReactDOM.render(<Router history={history} routes={routes} />, document.getElementById('content'));
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, documentTemplate(
      ReactDOMServer.renderToString(<RoutingContext {...renderProps} />)
    ));
  });
};
