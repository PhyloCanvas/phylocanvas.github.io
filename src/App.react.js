import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  render() {
    return (
      <div className={`clearfix ${this.props.className || ''}`.trim()}>
        <header>
          <a className="github-link" href="https://github.com/phylocanvas">
            <img src="/img/github.svg" />
          </a>
          <nav className="menu">
            <li>
              <a href="/v1.x">v1.x docs</a>
            </li>
            <li>
              <a href="#contact">contact</a>
            </li>
          </nav>
        </header>
        <div className="margins clearfix">
          <nav className="docs-nav">
            <h2>Navigation</h2>
            <li><Link to="/docs/quick-start">Quick Start</Link></li>
            <li><Link to="/docs/install">Installation</Link></li>
            <li><Link to="/docs/features">Features</Link></li>
            <li><Link to="/docs/events">Events</Link></li>
            <li><Link to="/docs/plugins">Plugins</Link></li>
            <li><Link to="/docs/migrating-from-1x">Migrating from 1.x</Link></li>
            <li><Link to="/docs/development">Development</Link></li>
          </nav>
          <main>
            {this.props.children}
          </main>
        </div>
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
