import fs from 'fs';

const path = './'; 
fs.readdir(path, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Contain: ");
  files.forEach(file => {
    console.log(file);
  });
});