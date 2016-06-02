import App from './App.react';
import Home from './Home.react';
import MarkdownContent from './MarkdownContent.react';
import Features from './Features.react.js';

const docsChildRoutes = [
  'quick-start',
  'install',
  // 'features',
  'events',
  'plugins',
  'migrating-from-v1x',
  'development',
].map(
  path => ({ path, component: MarkdownContent })
).concat([
  { path: 'features', component: Features },
]);

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
