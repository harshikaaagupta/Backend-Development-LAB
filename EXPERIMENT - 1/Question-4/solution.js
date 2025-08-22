// Write a program that uses a Readable stream to read data from a file (data.txt). Output the file content to the console. Ensure the file exists before reading, and handle any errors if the file is missing.

// const fs = require("fs");

// if(fs.existsSync("abc.txt")){
//     const abc = fs.createReadStream("abc.txt","utf-8");
//     abc.on("data" , data => console.log(data));
// }else{
//     console.log("Error: file not found");
// }

const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "abc.txt");

if (fs.existsSync(filePath)) {
    const abc = fs.createReadStream(filePath, "utf-8");
    abc.on("data", data => console.log(data));
} else {
    console.log("Error: file not found");
}