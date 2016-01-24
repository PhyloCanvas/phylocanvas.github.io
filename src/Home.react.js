import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="full-height">
        <div id="phylocanvas" />
        <a className="github-link" href="https://github.com/phylocanvas">
          <img src="/img/github.svg"/>
        </a>
        <nav className="menu">
          <li>
            <a href="/1.x">1.x docs</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </nav>
        <section>
          <header>
            <h1>
              <img src="/img/Phylo.FINAL.svg" className="logo" alt="phylocanvas" />
            </h1>
            <p className="lead">Interactive tree visualisation for the web.</p>
          </header>
          <nav className="cta">
            <a href="/getting-started">
            Get started with v2.0.0
            </a>
          </nav>
        </section>
        <footer id="contact">
          <p>Phylocanvas is maintained by<br />The Center for Genomic Pathogen Surveillance.</p>
          <img src="/img/CGPS.white_.FINAL_.svg" />
          <div className="acknowledgements">Icons made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
        </footer>
      </div>
    );
  },
});
