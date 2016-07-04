import React from 'react';

// Adapted from https://github.com/denislins/scrollmenu/

const options = {
  duration: 400,
  activeOffset: 40,
  scrollOffset: 10,

  // http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
  easingFunction(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
};

function getTargetOffset(item) {
  const selector = item.getAttribute('href');

  if (selector.match(/^#?$/)) {
    return 0;
  }

  return document.querySelector(selector).offsetTop;
}

function getSectionPosition(item) {
  return getTargetOffset(item) - options.activeOffset;
}

function getScrollOffset() {
  return document.body.scrollTop || window.pageYOffset;
}

function updateLocationHash(item) {
  const selector = item.getAttribute('href');
  let newUrl = location.pathname + location.search;

  if (!selector.match(/^#?$/)) {
    newUrl += selector;
  }

  history.pushState(selector, document.title, newUrl);
}

function scrollTo(to, duration, increment) {
  if (duration <= 0) return;

  const difference = to - getScrollOffset();
  increment = (increment || 0) + 10;

  setTimeout(() => {
    const newOffset = options.easingFunction(
      increment, getScrollOffset(), difference, duration
    );

    window.scroll(0, newOffset);

    if (duration !== increment) {
      scrollTo(to, duration, increment);
    }
  }, 10);
}

function animatePageScroll(position) {
  const totalOffset = -options.activeOffset + options.scrollOffset;
  const newPosition = position - totalOffset;

  scrollTo(newPosition, options.duration);
}

function onMenuItemClick(item, position, event) {
  event.preventDefault();

  updateLocationHash(item);
  animatePageScroll(position);
}

function bindMenuItems(element, position) {
  const eventListener = onMenuItemClick.bind(this, element, position);
  element.addEventListener('click', eventListener, false);
  return eventListener;
}

function smoothScroll(element, eventListener) {
  if (eventListener) {
    element.removeEventListener('click', eventListener);
  }
  const position = getSectionPosition(element);
  return bindMenuItems(element, position);
}


export default React.createClass({

  componentDidMount() {
    this.eventListener = smoothScroll(this.refs.link);
  },

  componentDidUpdate(previous) {
    if (this.props.rebindOn !== previous.rebindOn) {
      this.eventListener = smoothScroll(this.refs.link, this.eventListener);
    }
  },

  render() {
    const { href, children } = this.props;
    return (
      <a ref="link" href={href}>{children}</a>
    );
  },

});
