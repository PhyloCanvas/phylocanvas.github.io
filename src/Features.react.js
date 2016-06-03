import React from 'react';
import SyntaxHighlighter from './SyntaxHighlighter.react';

import { renderingClientSide } from './utils';

const loadNewickString = {
  id: 'load-newick-string',
  title: 'Load Newick String',
  code: require('raw!./features/load-newick-string.js?'),
};

const features = [
  loadNewickString,
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

const createDemoId = id => `demo-${id}`;

function initialiseDemo(Phylocanvas, id) {
  return require(`./features/${loadNewickString.id}.js`)(Phylocanvas, {
    newickString,
    elementOrId: createDemoId(id),
  });
}

export default React.createClass({

  componentDidMount() {
    if (renderingClientSide()) {
      const Phylocanvas = require('phylocanvas-quickstart');

      initialiseDemo(Phylocanvas, loadNewickString.id);

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
          <article key={id} id={id}>
            <h2>{title}</h2>
            <div id={createDemoId(id)} className="feature-demo"></div>
            <SyntaxHighlighter language={'javascript'}>
              {cleanRawCode(code)}
            </SyntaxHighlighter>
          </article>
        )) }
      </div>
    );
  },

});
