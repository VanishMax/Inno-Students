// html skeleton provider
export default function template(sheetsRegistry, helmet, initialState = {}, content = "", bundles){
  let css = sheetsRegistry.toString()
  let scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/client.js"></script>
                `
  let page = `<!DOCTYPE html>
              <html>
              <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#810051">
                <link rel="manifest" href="/manifest.json">
                <link rel="shortcut icon" href="/assets/logos/favicon.ico" type="image/x-icon">
                <link rel="icon" href="/assets/logos/favicon.ico" type="image/x-icon">
                <link rel="stylesheet" href="/assets/global.css">
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      <!--- magic happens here -->  ${content}
                   </div>
                   ${bundles.map(bundle => {
    return `<script src="/${bundle.file}"></script>`
  }).join('\n')}
                </div>
                <script>
                  if ('serviceWorker' in navigator) {
                      window.addEventListener('load', function() {
                          navigator.serviceWorker.register('/service-worker.js');
                      });
                  }
                </script>
                  <style id="jss-server-side">${css}</style>
                  ${scripts}
              </body>
              `

  return page
}
