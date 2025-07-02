import fs, { readFileSync } from 'fs'

export const readFile = () =>{
  fs.readFile("file-date.txt", "utf-8", (error, data)=>{
   if(error) console.log(error);
   else console.log(data);
 })
}