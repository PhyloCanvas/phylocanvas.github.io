import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="full-height">
        <div id="phylocanvas" />
        <nav className="menu">
          <li>
            <a href="/1.x">1.x docs</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </nav>
        <section>
          <header>
            <h1>
              <img src="/img/Phylo.FINAL.svg" className="logo" alt="phylocanvas" />
            </h1>
            <p className="lead">Phylogenetic tree visualisation for the web.</p>
          </header>
          <nav className="cta">
            <a href="/getting-started">
              Get Started with v2.0.0
            </a>
          </nav>
        </section>
        <footer id="contact">
          <p>Maintented by<br />The Center for Genomic Pathogen Surveillance.</p>
        </footer>
      </div>
    );
  },
});
