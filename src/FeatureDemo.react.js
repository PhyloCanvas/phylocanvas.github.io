import React from 'react';

import SyntaxHighlighter from './SyntaxHighlighter.react';

import { renderingClientSide } from './utils';

const language = 'javascript';
const newickString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';
const noEvalDirective = '/* no-eval */\n';
const treeConfig = {
  branchColour: '#3C7383',
  selectedColour: '#673c90',
  highlightColour: '#3C7383',
};

export default React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    const { source } = this.props;
    const noEval = source.indexOf(noEvalDirective) === 0;
    return {
      noEval,
      source: noEval ? source.split(noEvalDirective)[1] : source,
    };
  },

  componentDidMount() {
    if (renderingClientSide()) {
      const Phylocanvas = require('phylocanvas').default;
      const { noEval, source } = this.state;

      const fn = noEval ? () => {} : eval(`(function(tree) {${source}})`);
      const instance = Phylocanvas.createTree(this.refs.demo, treeConfig);
      instance.load(newickString, () => fn(instance));
    }
  },

  render() {
    return (
      <article>
        <div ref="demo" className="feature-demo"></div>
        <SyntaxHighlighter language={language}>
          {this.state.source}
        </SyntaxHighlighter>
      </article>
    );
  },

});
