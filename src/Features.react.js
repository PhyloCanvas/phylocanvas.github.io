import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/styles/color-brewer';

import { renderingClientSide } from './utils';

const language = {
  javascript: require('highlight.js/lib/languages/javascript'),
};

const features = [
  { id: 'load-newick-string',
    title: 'Load Newick String',
    code: require('raw!./features/load-newick-string.js?'),
  },
  { id: 'set-tree-type',
    title: 'Set Tree Type',
    code: require('raw!./features/set-tree-type.js?'),
  },
  { id: 'show-hide-labels',
    title: 'Show/Hide Labels',
    code: require('raw!./features/show-hide-labels.js?'),
  },
  { id: 'align-labels',
    title: 'Align Labels',
    code: require('raw!./features/align-labels.js?'),
  },
];

const newickString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';

function cleanRawCode(code) {
  return (
    code.
      split('\n').
      filter((_, i, lines) => (i > 0 && i < lines.length - 3)).
      map(line => line.trim()).
      join('\n')
  );
}

function initialiseDemo(Phylocanvas, id) {
  return require('./features/load-newick-string.js')(Phylocanvas, {
    newickString,
    elementOrId: id,
  });
}

export default React.createClass({

  componentDidMount() {
    if (renderingClientSide()) {
      const Phylocanvas = require('phylocanvas-quickstart');

      initialiseDemo(Phylocanvas, features[0].id);

      for (let { id } of features.slice(1)) {
        let tree = initialiseDemo(Phylocanvas, id);
        require(`./features/${id}.js`)(tree);
      }
    }
  },

  render() {
    return (
      <div>
        <h1>Features</h1>
        { features.map(({ id, title, code }) => (
          <article key={id}>
            <h2>{title}</h2>
            <div id={id} className="feature-demo"></div>
            <SyntaxHighlighter language={language} style={style}>
              {cleanRawCode(code)}
            </SyntaxHighlighter>
          </article>
        )) }
      </div>
    );
  },

});
