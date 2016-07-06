import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Header from './Header.react';
import Footer from './Footer.react';
import ToggleZoom from './ToggleZoom.react';

import { treeDefaults, renderingClientSide, scrollTo } from './utils';

export default React.createClass({

  componentDidMount() {
    if (renderingClientSide()) {
      scrollTo(0);

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

      this.tree = tree;
    }
  },

  componentWillUnmount() {
    if (renderingClientSide()) {
      window.removeEventListener('resize', this.resizeEvent);
    }
  },

  getTree() {
    return this.tree;
  },

  render() {
    return (
      <DocumentTitle title="Phylocanvas">
        <div ref="parent" className="home-page">
          <Header />
          <div className="full-height">
            <section className="home-intro text-center">
              <div id="phylocanvas" ref="canvas" />
              <header>
                <h1>
                  <img src="/img/Phylo.FINAL.svg" className="logo" alt="phylocanvas" />
                </h1>
                <p className="lead">Interactive tree visualisation <br />for the web.</p>
              </header>
              <div className="zoom-wrapper">
                <ToggleZoom getTree={this.getTree}>Toggle Zoom</ToggleZoom>
              </div>
              <p className="cta">
                <Link to="/docs">Get Started with v2.x</Link>
              </p>
            </section>
          </div>
          <section className="alt-section section-padding text-center flex-section">
            <h2 className="section-heading">Phylocanvas in Action</h2>
            <ul className="apps">
              <li>
                <a href="https://www.wgsa.net" target="_blank">
                  <img src="/img/wgsa.svg" />
                </a>
              </li>
              <li>
                <a href="https://microreact.org" target="_blank">
                  <img src="/img/microreact.svg" />
                </a>
              </li>
              <li>
                <a href="http://jameshadfield.github.io/phandango" target="_blank">
                  <img src="/img/phandango.png" />
                </a>
              </li>
            </ul>
          </section>
          <Footer />
        </div>
      </DocumentTitle>
    );
  },
});
