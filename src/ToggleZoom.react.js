import React from 'react';

import Toggle from './Toggle.react';

export default React.createClass({

  getInitialState() {
    return {
      disabled: true,
    };
  },

  toggleZoom(checked) {
    const disabled = !checked;
    this.setState({ disabled });

    const tree = this.props.getTree();
    if (!tree) return;
    tree.disableZoom = disabled;
  },

  render() {
    return (
      <div className="zoom-wrapper">
        <Toggle onChange={this.toggleZoom}>
          {`Zoom ${this.state.disabled ? 'disabled' : 'enabled'}`}
        </Toggle>
      </div>
    );
  },

});
