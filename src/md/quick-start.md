# Quick Start
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0.625em auto;
      max-width: 60em;
    }
    #phylocanvas {
      width: 100%;
      height: 30em;
    }
  </style>
</head>
<body>
  <h1>Phylocanvas Quickstart</h1>
  <div id="phylocanvas"></div>
  <script type="application/javascript"  src="https://cdn.rawgit.com/phylocanvas/phylocanvas-quickstart/v2.3.0/phylocanvas-quickstart.js"></script>
  <script type="application/javascript">
    (function (Phylocanvas) {
      var tree = Phylocanvas.createTree('phylocanvas');
      tree.load('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;');
    })(window.Phylocanvas);
  </script>
</body>
</html>
```
Above is an example of a simple Phylocanvas application.

For simple applications and demos we recommend referencing the Quickstart package as seen above. This automatically enables the following plugins:

* [Ajax](/plugins/ajax)
* [Context Menu](/plugins/context-menu)
* [History](/plugins/history)
* [Metadata](/plugins/metadata)

For larger applications we recommend [using a module bundler and package management system](/install) to include only the plugins you need.

## Next Steps

Discover [the features of Phylocanvas](/features) or [browse the API](/api)
