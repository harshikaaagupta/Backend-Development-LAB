// Reading into a file asynchronously and writing code for handling error if file not found to read.

// const fs = require("fs");
// fs.readFile("hello.txt" , "utf-8" ,(err,data) => {
//     if(err){
//         if(err.code == "ENOENT"){
//             console.error("File not found.");
//         }
//         else{
//             console.error("Error reading file");
//         }
//         return;
//     }
// console.log(data);
// });

const fs = require("fs");
const path = require("path");

console.log("Script directory:", __dirname);  // shows folder of code.js
console.log("Current working directory:", process.cwd());  // shows folder where node command is run

const filePath = path.join(__dirname, "hello.txt");
console.log("Looking for file at:", filePath);

fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        if (err.code === "ENOENT") {
            console.error("File not found.");
        } else {
            console.error("Error reading file:", err);
        }
        return;
    }
    console.log(data);
});
