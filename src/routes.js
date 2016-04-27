import Home from './Home.react';
import Quickstart from './Quickstart.react';

export default [
  { path: '/quickstart',
    component: Quickstart,
  },
  { path: '/',
    component: Home,
    // indexRoute: { component: Home },
    // childRoutes: [ ]
  },
];
