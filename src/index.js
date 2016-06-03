import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import {
  Router,
  RouterContext,
  match,
  browserHistory,
  createMemoryHistory,
} from 'react-router';
import { registerLanguages } from 'react-syntax-highlighter';

import routes from './routes';
import documentTemplate from './document';

import { renderingClientSide } from './utils';

registerLanguages({
  javascript: require('highlight.js/lib/languages/javascript'),
  css: require('highlight.js/lib/languages/css'),
  html: require('highlight.js/lib/languages/xml'),
  bash: require('highlight.js/lib/languages/bash'),
});

// Client render (optional):
if (renderingClientSide()) {
  require('./css/styles.css');
  render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('content')
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, documentTemplate(
      renderToString(<RouterContext {...renderProps} />)
    ));
  });
};
