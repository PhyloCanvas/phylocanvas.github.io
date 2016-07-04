import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router';

import FeatureDemo from './FeatureDemo.react';
import SyntaxHighlighter from './SyntaxHighlighter.react';
import SmoothLink from './SmoothLink.react.js';

function parseDirectives(str) {
  return str.split(';').reduce((memo, directive) => {
    const [ key, value = true ] = directive.split(':');
    return { ...memo, [key]: value };
  }, {});
}

const renderers = {
  Link: ({ href, title, children }) => {
    if (href.indexOf('/docs') === 0) {
      return (
        <Link to={href}>{children}</Link>
      );
    }
    if (title === '--smooth') {
      return (
        <SmoothLink href={href}>{children}</SmoothLink>
      );
    }
    return (
      <a href={href} title={title}>{children}</a>
    );
  },
  CodeBlock: ({ language, literal }) => (
    (language.indexOf('phyloscript') === 0) ? (
      <FeatureDemo
        source={literal}
        directives={parseDirectives(language.split('--')[1] || '')}
      />
    ) : (
    <SyntaxHighlighter language={language}>
      {literal}
    </SyntaxHighlighter>
  )),
  Heading: ({ level, children }) => (
    level === 2 && children[0].toLowerCase ?
      <h2 id={children[0].toLowerCase().replace(/\W/g, '-')}>{children}</h2> :
      React.createElement(`h${level}`, null, children)
  ),
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
