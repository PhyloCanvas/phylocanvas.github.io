module.exports = function (Phylocanvas, { newickString, elementOrId, config = {} }) {
  const tree = Phylocanvas.createTree(elementOrId, config); // see API for config options
  tree.load(newickString, () => console.log('tree loaded'));
  // calls `tree.draw()` implicitly
  return tree;
};
