import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router';

const renderers = {
  Link: ({ href, title, children }) => {
    if (href[0] === '/') {
      return (
        <Link to={href}>{children}</Link>
      );
    }

    return (
      <a href={href} title={title}>{children}</a>
    );
  },
};

export default React.createClass({

  render() {
    const path =
      this.props.route.path ||
      this.props.location.pathname.replace(/\//g, '');
    const content = require(`raw!./md/${path}.md`);
    return (
      <Markdown source={content} renderers={renderers} />
    );
  },
});
