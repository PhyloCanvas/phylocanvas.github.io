import React from 'react';

import SyntaxHighlighter from './SyntaxHighlighter.react';
import ToggleZoom from './ToggleZoom.react';

import * as utils from './utils';

const language = 'javascript';
const newickString = '(A:1,B:2,(C:3,D:4)E:5)F;';

function standardConfig() {
  return {
    ...utils.treeDefaults,
    history: false,
    contextMenu: false,
    scalebar: {
      active: false,
    },
  };
}

const pluginConfigs = {
  ['context-menu']() {
    return {
      ...standardConfig(),
      contextMenu: true,
    };
  },
  history() {
    return {
      ...standardConfig(),
      history: true,
    };
  },
  metadata: standardConfig,
  ajax: standardConfig,
  scalebar() {
    const scalebarConfig = utils.scalebarDefaults;
    scalebarConfig.digits = 2;
    return {
      ...standardConfig(),
      scalebar: scalebarConfig,
    };
  },
};

const style = { position: 'relative' };

export default React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    directives: React.PropTypes.object,
  },

  componentDidMount() {
    if (utils.renderingClientSide()) {
      const { source, directives } = this.props;
      const { noEval, noLoad, plugin } = directives;

      const fn = noEval ? () => {} : eval(`(function (tree) {${source}})`);

      const Phylocanvas = utils.getPhylocanvasModule();
      this.instance = Phylocanvas.createTree(
        this.refs.demo,
        (pluginConfigs[plugin] || standardConfig)()
      );

      if (noLoad) {
        fn(this.instance);
        return;
      }
      this.instance.load(newickString, () => fn(this.instance));
    }
  },

  getInstance() {
    return this.instance;
  },

  render() {
    const { source, directives } = this.props;
    return (
      <figure style={style}>
        <ToggleZoom getTree={this.getInstance} />
        <div
          ref="demo"
          className={`feature-demo ${directives.plugin ? 'feature-demo--large' : ''}`.trim()}
        ></div>
        { source ?
          <SyntaxHighlighter language={language}>
            {source}
          </SyntaxHighlighter> :
          null
        }
      </figure>
    );
  },

});
