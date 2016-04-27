import React from 'react';
import Markdown from 'react-markdown';

export default React.createClass({

  render() {
    if (typeof document === 'undefined') {
      const quickStart = require('raw!./md/quick-start.md');
      return (
        <Markdown source={quickStart} />
      );
    }
  },
});
