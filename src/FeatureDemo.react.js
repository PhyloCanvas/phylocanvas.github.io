import React from 'react';

import SyntaxHighlighter from './SyntaxHighlighter.react';

import { treeDefaults, renderingClientSide } from './utils';

const language = 'javascript';
const newickString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';

const standardConfig = {
  ...treeDefaults,
  history: false,
  contextMenu: false,
};

function standardInstance(containerElement) {
  const Phylocanvas = require('phylocanvas-quickstart');
  return Phylocanvas.createTree(containerElement, standardConfig);
}

const pluginInstances = {
  ['context-menu'](containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    return Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      history: false,
    });
  },
  history(containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    const tree = Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      contextMenu: false,
    });
    tree.setTreeType('rectangular');
    return tree;
  },
  metadata() {

  },
};

export default React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    directives: React.PropTypes.object,
  },

  componentDidMount() {
    if (renderingClientSide()) {
      const { source, directives } = this.props;
      const { noEval, plugin } = directives;

      const fn = noEval ? () => {} : eval(`(function (tree) {${source}})`);

      const instance = (pluginInstances[plugin] || standardInstance)(this.refs.demo);
      instance.load(newickString, () => fn(instance));
    }
  },

  render() {
    return (
      <article>
        <div ref="demo" className="feature-demo"></div>
        { this.props.source ?
          <SyntaxHighlighter language={language}>
            {this.props.source}
          </SyntaxHighlighter> :
          null
        }
      </article>
    );
  },

});
