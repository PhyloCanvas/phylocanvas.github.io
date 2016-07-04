export const treeDefaults = {
  branchColour: '#3C7383',
  selectedColour: '#FF9D39',
  highlightColour: '#3C7383',
  baseNodeSize: 10,
  disableZoom: true,
  padding: 8,
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
