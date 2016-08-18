// import React from 'react';
// import { Link } from 'react-router';
// import App from './App.react';
import Home from './Home.react';
// import MarkdownContent from './MarkdownContent.react';

// const docsChildRoutes = [
//   'quick-start',
//   'install',
//   'features',
//   'events',
//   'plugins',
//   'migrating-from-v1x',
//   'development',
// ].map(
//   path => ({ path, component: MarkdownContent })
// );

const noTrailingSlash = /[^\/]$/;

export default [
  { path: 'docs',
    component: ({ children }) => children,
    getIndexRoute(partialNextState, cb) {
      require.ensure([], require => {
        cb(null, [
          require('./testIndexRoute'),
        ]);
      });
    },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], require => {
        cb(null, [
          require('./testRoute'),
        ]);
      });
    },
    onEnter({ location }, replace) {
      if (!location) return;

      if (noTrailingSlash.test(location.pathname)) {
        replace(`${location.pathname}/`);
      }
    },
  },
  { path: '/',
    component: Home,
  },
];
