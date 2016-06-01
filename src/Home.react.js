import React from 'react';
import { Link } from 'react-router';

import App from './App.react';
import { renderingClientSide } from './utils';

export default React.createClass({

  componentDidMount() {
    if (renderingClientSide()) {
      const Phylocanvas = require('phylocanvas-quickstart');
      const tree = Phylocanvas.createTree('phylocanvas', {
        history: false,
        disableZoom: true,
      });

      tree.branchColour = '#3C7383';
      tree.selectedColour = '#673c90';
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
        this.refs.canvas.style.opacity = 1;
      });

      this.resizeEvent = () => {
        tree.fitInPanel();
        tree.draw();
      };

      window.addEventListener('resize', this.resizeEvent);
    }
  },

  componentWillUnmount() {
    if (renderingClientSide()) {
      window.removeEventListener('resize', this.resizeEvent);
    }
  },

  render() {
    return (
      <App className="splash-screen">
        <section className="home-intro text-center">
          <div id="phylocanvas" ref="canvas" />
          <header>
            <h1>
              <img src="/img/Phylo.FINAL.svg" className="logo" alt="phylocanvas" />
            </h1>
            <p className="lead">Interactive tree visualisation <br />for the web.</p>
          </header>
          <p className="cta">
            <Link to="/docs">Get Started with v2.x</Link>
          </p>
        </section>
      </App>
    );
  },
});
