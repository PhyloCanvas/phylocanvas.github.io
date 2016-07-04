import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/styles/color-brewer';

export default ({ language, children }) => (
  <SyntaxHighlighter language={language} style={style}>
    {children}
  </SyntaxHighlighter>
);
