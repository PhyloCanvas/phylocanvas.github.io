export const treeDefaults = {
  branchColour: '#3C7383',
  selectedColour: '#FF9D39',
  highlightColour: '#3C7383',
  baseNodeSize: 10,
  disableZoom: true,
  padding: 8,
};

export const scalebarDefaults = {
  position: {
    right: 32,
    bottom: 8,
  },
  width: 96,
  height: 16,
  font: '13px Roboto',
  textBaseline: 'middle',
  fillStyle: '#3C7383',
  strokeStyle: '#3C7383',
  digits: 0,
};

export function renderingClientSide() {
  return typeof document !== 'undefined';
}

export function scrollTo(value) {
  const documentElement =
    document.documentElement && document.documentElement.scrollTop ?
      document.documentElement :
      document.body;

  documentElement.scrollTop = value;
}

let phylocanvas = null;

if (renderingClientSide()) {
  phylocanvas = require('phylocanvas').default;
  phylocanvas.plugin(require('phylocanvas-plugin-ajax').default);
  phylocanvas.plugin(require('phylocanvas-plugin-context-menu').default);
  phylocanvas.plugin(require('phylocanvas-plugin-history').default);
  phylocanvas.plugin(require('phylocanvas-plugin-metadata').default);
  phylocanvas.plugin(require('phylocanvas-plugin-scalebar').default);
}

export function getPhylocanvasModule() {
  return phylocanvas;
}
