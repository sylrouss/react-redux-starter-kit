export function parseQueryString (url) {
  var urlParams = {}
  url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    urlParams[$1] = $3
  })
  return urlParams
}
