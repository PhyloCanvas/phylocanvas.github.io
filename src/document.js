export default (html) => `
  <!doctype html>
  <html lang='en'>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Phylocanvas</title>
      <link rel="icon" type="image/png"  href="/img/phylo.icon.final.png" />
      <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,700,500,100" rel="stylesheet" type="text/css" />
      <link href="/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="content">${html}</div>
      <script src="/index.js"></script>
    </body>
  </html>
`;
