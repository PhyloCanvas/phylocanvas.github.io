# Development

## Materials
Phylocanvas leverages npm and its ecosystem for a streamlined development experience. Assuming Git, Node.js, and npm are installed, run the following to start.
```bash
git clone https://github.com/phylocanvas/phylocanvas.git
npm install
```

## Workflow
```bash
npm start
```
Now navigate to [http://localhost:8000/dev](http://localhost:8080/dev). The development sandbox is located in the `/dev` folder of the repository, where `index.js` is an example Phylocanvas application using the unbuilt source files. Changes are automatically updated as files are saved, so simply hack away!

## Building
To produce a newly bundled version of Phylocanvas, please run the following.
```bash
npm run build
```
This should output to the `/dist` folder.

## Pull Requests
Pull requests are very much welcome. We ask that you do not include bundles in PRs as we will bundle changes into the next release ourselves. [Read more about contributing](https://github.com/phylocanvas/phylocanvas/blob/master/CONTRIBUTING.md).
