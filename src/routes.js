import React from 'react';

import App from './App.react';
import Home from './Home.react';
import MarkdownContent from './MarkdownContent.react';

const docsChildRoutes = [
  'quick-start',
  'migrating-from-1x',
].map(path => {
  return {
    path,
    component: MarkdownContent,
  };
});

export default [
  { path: 'docs',
    component: App,
    indexRoute: { component: MarkdownContent },
    childRoutes: docsChildRoutes,
  },
  { path: '/',
    component: Home,
  },
];
