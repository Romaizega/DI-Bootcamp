const fs = require('fs');

const readFile = (path, callback) => {
  fs.readFile(path, 'utf-8', callback);
};

const writeFile = (path, content, callback) => {
  fs.writeFile(path, content, 'utf-8', callback);
};

module.exports = {
  readFile,
  writeFile
};