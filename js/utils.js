function loadData(callback) {
  var dirsToLoad = Object.keys(struct);
  var promises = []

  dirsToLoad.forEach(function(dir) {
    var filesToLoad = ['index'].concat(struct[dir]);
    systemData[dir] = {}
    filesToLoad.forEach(function(file) {
      var url = ['.', 'data', dir, file + '.html'].join('/')
      var p = new Promise(function(resolve, reject) {
        fetch(url).then(function(res) {
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
