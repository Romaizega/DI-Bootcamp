import fs from 'fs'

fs.readFile("source.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    fs.writeFile('destination.txt', data, 'utf-8', (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Succsefully");
      }
    });
  }
});