export default (html) => `
  <!doctype html>
  <html lang='en'>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Phylocanvas</title>
      <link rel="icon" type="image/png"  href="/img/phylo.icon.final.png" />
      <link href="http://fonts.googleapis.com/css?family=Roboto:300,400|Roboto+Condensed:400" rel="stylesheet" type="text/css" />
      ${
      process.env.NODE_ENV === 'production' ?
      '<link href="/styles.css" rel="stylesheet" type="text/css" />' :
      ''}
    </head>
    <body>
      <div id="content">${html}</div>
      <script src="/index.js"></script>
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-75242407-1', 'auto');
        ga('send', 'pageview');
      </script>
    </body>
  </html>
`;
