module.exports = function (tree) {
  tree.setTreeType('rectangular'); // N.B. not supported on radial or diagonal tree types
  tree.alignLabels = true; // false to reset
  tree.draw();
  return tree;
};
