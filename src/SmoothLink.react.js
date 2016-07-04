import React from 'react';

import smoothScroll from './smoothScroll';

export default React.createClass({

  componentDidMount() {
    smoothScroll([ this.refs.link ]);
  },

  render() {
    return (
      <a ref="link" {...this.props} />
    );
  },

});
