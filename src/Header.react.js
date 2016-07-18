import React from 'react';
import { Link } from 'react-router';

import SmoothLink from './SmoothLink.react';

export const navigationLinks = [
  { to: '/docs/', text: 'Docs Home' },
  { to: '/docs/quick-start/', text: 'Quick Start' },
  { to: '/docs/install/', text: 'Installation' },
  { to: '/docs/features/', text: 'Features' },
  { to: '/docs/events/', text: 'Events' },
  { to: '/docs/plugins/', text: 'Plugins' },
  { to: '/docs/migrating-from-v1x/', text: 'Migrating from v1.x' },
  { to: '/docs/development/', text: 'Development' },
];

export const Nav = ({ pathname }) => (
  <nav className="docs-nav">
    <h2>Navigation</h2>
    <ul>
      {navigationLinks.map(({ to, text }) => (
        <li key={to}>
          <Link to={to} className={to === pathname ? 'active' : ''}>{text}</Link>
        </li>
      ))}
      <li>
        <a href="/docs/api/">API</a>
      </li>
    </ul>
  </nav>
);

export default React.createClass({

  render() {
    return (
      <header>
        <Link className="docs-logo" to="/">
          <img src="/img/Phylo.Icon.FINAL.svg" alt="Phylocanvas Icon" />
          <span>Phylocanvas</span>
          <sup>v{PHYLOCANVAS_VERSION}</sup>
        </Link>
        <nav className="top-nav">
          <li>
            <a href="/v1.x">v1.x Docs</a>
          </li>
          <li>
            <SmoothLink
              ref="contact"
              href="#contact"
              rebindOn={this.props.pathname}
            >
              Contact
            </SmoothLink>
          </li>
          <li>
            <a className="github-link" href="https://github.com/phylocanvas" title="Phylocanvas on Github">
              <img src="/img/github.svg" alt="Github logo" />
            </a>
          </li>
        </nav>
        <Nav pathname={this.props.pathname} />
      </header>
    );
  },

});
