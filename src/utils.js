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
