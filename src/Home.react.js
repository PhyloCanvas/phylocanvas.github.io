import React from 'react';
import { Link } from 'react-router';

import App from './App.react';
import { treeDefaults, renderingClientSide } from './utils';

export default React.createClass({

  componentDidMount() {
    if (renderingClientSide()) {
      const Phylocanvas = require('phylocanvas-quickstart');
      const tree = Phylocanvas.createTree('phylocanvas', {
        ...treeDefaults,
        padding: 32,
      });

      tree.on('loaded', () => {
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

      tree.load(require('raw!../v1.x/docs/data/tree.nwk'), () => {
        this.refs.canvas.style.opacity = 1;
        // for (const leaf of tree.leaves) {
        //   leaf.data = {
        //     column1: '#673c90',
        //     column2: '#a386bd',
        //     column3: '#673c90',
        //     column4: '#a386bd',
        //   };
        // }
        // tree.viewMetadataColumns();
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
      <App className="home-page">
        <div className="full-height">
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
          <section className="alt-section section-padding text-center flex-section">
            <h2 className="section-heading">Phylocanvas in Action</h2>
            <ul className="apps">
              <li>
                <a href="http://www.wgsa.net">
                  <img src="http://www.wgsa.net/assets/img/WGSA.FINAL.svg" />
                </a>
              </li>
              <li>
                <a href="https://microreact.org">
                  <img src="https://microreact.org/images/Micro.FINAL.svg" />
                </a>
              </li>
              <li>
                <a href="http://jameshadfield.github.io/phandango">
                  <img src="/img/phandango.png" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </App>
    );
  },
});
