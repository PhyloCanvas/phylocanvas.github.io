module.exports = function (tree) {
  tree.setTreeType('rectangular'); // or radial, circular, diagonal, hierarchical
  // calls `tree.draw()` implicitly
  return tree;
};
