function loadData(callback) {
  var dirsToLoad = Object.keys(struct);
  var promises = []

  dirsToLoad.forEach(function(dir) {
    var filesToLoad = ['index'].concat(struct[dir]);
    systemData[dir] = {}
    filesToLoad.forEach(function(file) {
      var url = ['.', 'data', dir, file + '.html'].join('/')
      var p = new Promise(function(resolve, reject) {
        var headers = {}
        addSecurityHeader(headers);
        fetch(url, {
          headers: headers,
          referrerPolicy: "same-origin",
          mode: "same-origin"
        }).then(function(res) {
          res.text().then(function(data) {
            systemData[dir][file] = data;
            resolve();
          });
        });
      });
      promises.push(p);
    })
  })
  Promise.all(promises).then(function(data) {
    callback();
  }, function(err) {
    console.error(err);
  })
}

function addSecurityHeader(headers) {
  headers['X-Frame-Options'] = 'DENY';
  headers['X-XSS-Protection'] = '1; mode=block';
  headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  headers['X-Content-Type-Options'] = 'nosniff';
  headers['Content-Security-Policy'] = "script-src 'self' https://www.google-analytics.com";

}
//
// method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//   'Content-Type': 'application/json'
//   // 'Content-Type': 'application/x-www-form-urlencoded',
// },
// redirect: 'follow', // manual, *follow, error
//   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(data) // body data type must match "Content-Type" header
