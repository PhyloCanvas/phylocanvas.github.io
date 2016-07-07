import App from './App.react';
import Home from './Home.react';
import MarkdownContent from './MarkdownContent.react';

const docsChildRoutes = [
  'quick-start',
  'install',
  'features',
  'events',
  'plugins',
  'migrating-from-v1x',
  'development',
].map(
  path => ({ path, component: MarkdownContent })
);

const noTrailingSlash = /[^\/]$/;

export default [
  { path: 'docs',
    component: App,
    indexRoute: { component: MarkdownContent },
    childRoutes: docsChildRoutes,
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
