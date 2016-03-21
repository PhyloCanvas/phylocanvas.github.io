import React from 'react';

export default React.createClass({

  componentDidMount() {
    if (typeof document !== 'undefined') {
      const Phylocanvas = require('phylocanvas-quickstart');
      const tree = Phylocanvas.createTree('phylocanvas', {
        history: false,
        disableZoom: true,
      });

      tree.branchColour = '#3C7383';
      tree.highlightColour = '#3C7383';
      tree.baseNodeSize = 10;
      tree.padding = 32;
      tree.load('/v1.x/docs/data/tree.nwk', () => {
        for (const leaf of tree.leaves) {
          leaf.setDisplay({
            leafStyle: {
              fillStyle: '#9BB7BF',
              lineWidth: 1.5,
            },
          });
        }
        tree.draw();
      });

      this.resizeEvent = () => {
        tree.fitInPanel();
        tree.draw();
      };

      window.addEventListener('resize', this.resizeEvent);
    }
  },

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      window.removeEventListener('resize', this.resizeEvent);
    }
  },

  render() {
    return (
      <div className="full-height">
        <a className="github-link" href="https://github.com/phylocanvas">
          <img src="/img/github.svg"/>
        </a>
        <nav className="menu">
          <li>
            <a href="/v1.x">v1.x docs</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </nav>
        <section className="home-intro">
          <div id="phylocanvas" />
          <header>
            <h1>
              <img src="/img/Phylo.FINAL.svg" className="logo" alt="phylocanvas" />
            </h1>
            <p className="lead">Interactive tree visualisation <br />for the web.</p>
          </header>
          <p className="cta">
            <span>v2.x docs coming soon.</span>
          </p>
        </section>
        <footer id="contact">
          <p>Phylocanvas is maintained by<br />The Centre for Genomic Pathogen Surveillance.</p>
          <img src="/img/CGPS.white_.FINAL_.svg" />
          <div className="icon-acknowledgement">Github icon made by <a href="http://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
        </footer>
      </div>
    );
  },
});
