import React from 'react';
import { Link } from 'react-router';

const navigationLinks = [
  { to: '/docs/', text: 'Docs Home' },
  { to: '/docs/quick-start/', text: 'Quick Start' },
  { to: '/docs/install/', text: 'Installation' },
  { to: '/docs/features/', text: 'Features' },
  { to: '/docs/events/', text: 'Events' },
  { to: '/docs/plugins/', text: 'Plugins' },
  { to: '/docs/migrating-from-v1x/', text: 'Migrating from v1.x' },
  { to: '/docs/development/', text: 'Development' },
];

export default React.createClass({

  componentDidMount() {
  },

  componentDidUpdate(previous) {
    if (this.props.location.pathname !== previous.location.pathname) {
      (document.documentElement || document.body).scrollTop = 0;
    }
  },

  getNavigationLinks() {
    const { pathname } = this.props.location || {};

    return navigationLinks.map(({ to, text }) => {
      console.log(pathname, to, to === pathname);
      return (
        <li key={to}>
          <Link
            to={to}
            className={to === pathname ? 'active' : ''}
          >
            {text}
          </Link>
        </li>
      );
    });
  },

  render() {
    return (
      <div className={`${this.props.className || 'docs-page'}`.trim()}>
        <header>
          <Link className="docs-logo" to="/">
            <img src="/img/Phylo.Icon.FINAL.svg" alt="phylocanvas" />
            <span>Phylocanvas</span>
          </Link>
          <nav className="top-nav">
            <li>
              <a href="/v1.x">v1.x Docs</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a className="github-link" href="https://github.com/phylocanvas">
                <img src="/img/github.svg" />
              </a>
            </li>
          </nav>
          <nav className="docs-nav">
            <h2>Navigation</h2>
            <ul>
              {this.getNavigationLinks()}
            </ul>
          </nav>
        </header>
        <main className="margins">
          {this.props.children}
        </main>
        <footer id="contact" className="text-center">
          <p>Phylocanvas is maintained by<br /><strong>The Centre for Genomic Pathogen Surveillance</strong>.</p>
          <a href="http://www.pathogensurveillance.net">
            <img src="/img/CGPS.white_.FINAL_.svg" />
          </a>
          <a className="contact-email" href="mailto:cgps@sanger.ac.uk">cgps@sanger.ac.uk</a>
          <p className="icon-acknowledgement">Github icon made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></p>
        </footer>
      </div>
    );
  },

});
