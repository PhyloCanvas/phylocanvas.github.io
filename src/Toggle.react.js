import React from 'react';

export default React.createClass({

  getInitialState() {
    return {
      checked: false,
    };
  },

  onChange() {
    const { checked } = this.refs.input;
    this.setState({ checked });
    this.props.onChange(checked);
  },

  getClassName() {
    const { checked } = this.state;
    return (
      `material-toggle ${checked ? 'material-toggle--checked' : ''}`.trim()
    );
  },

  render() {
    return (
      <label className={this.getClassName()} onChange={this.onChange}>
        <input ref="input" type="checkbox" />
        <span className="material-toggle__label">{this.props.children}</span>
      </label>
    );
  },

});
