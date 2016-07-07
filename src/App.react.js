import React from 'react';
import DocumentTitle from 'react-document-title';

import Header, { navigationLinks } from './Header.react';
import Footer from './Footer.react';

import { renderingClientSide, scrollTo } from './utils';

export default React.createClass({

  componentWillMount() {
    if (renderingClientSide()) {
      scrollTo(0);
    }
  },

  componentWillUpdate(next) {
    if (this.props.location.pathname !== next.location.pathname) {
      scrollTo(0);
    }
  },

  getDocumentTitle() {
    const { pathname } = this.props.location || {};
    if (pathname) {
      for (const { to, text } of navigationLinks) {
        if (to === pathname) {
          return `Phylocanvas - ${text}`;
        }
      }
    }
    return 'Phylocanvas';
  },

  render() {
    const { location = {} } = this.props;
    return (
      <div className={`${this.props.className || 'docs-page'}`.trim()}>
        <Header pathname={location.pathname} />
        <main className="margins">
          <DocumentTitle title={this.getDocumentTitle()}>
            {this.props.children}
          </DocumentTitle>
        </main>
        <Footer />
      </div>
    );
  },

});
