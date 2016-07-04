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

function getSectionsPositions(items) {
  return items.map(item => getTargetOffset(item) - options.activeOffset);
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

function bindMenuItems(items, positions) {
  items.forEach((item, i) =>
    item.addEventListener('click', onMenuItemClick.bind(this, item, positions[i]), false)
  );
}

export default function (items) {
  const positions = getSectionsPositions(items);
  bindMenuItems(items, positions);
}
