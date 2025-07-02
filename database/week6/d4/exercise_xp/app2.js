const { readFile, writeFile } = require('./fileManager');

readFile('Hello World.txt', (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

writeFile('Bye World.txt', 'Bye World !!', (err) => {
  if (err) console.error(err);
});