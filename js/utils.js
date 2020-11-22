function loadData(callback) {
  var dirsToLoad = Object.keys(struct);

  function load(dirs, currentDir, files) {
    if (files && files.length) {
      var currentFile = files.shift();
      var url = ['.', 'data', currentDir, currentFile + '.html'].join('/')
      $.get(url, function(data) {
        systemData[currentDir][currentFile] = data;
        load(dirs, currentDir, files)
      });
    } else if (dirs.length) {
      var dir = dirs.shift();
      var filesToLoad = ['index'].concat(struct[dir]);
      systemData[dir] = {}
      load(dirs, dir, filesToLoad);
    } else {
      callback();
    }
  }
  load(dirsToLoad);
}
