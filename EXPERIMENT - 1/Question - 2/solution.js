// Reading into a file asynchronously and writing code for handling error if file not found to read.

const fs = require("fs/promises");
fs.readFile("hello.txt" , "utf-8" ,(err,data) => {
    if(err){
        if(err.code == "ENOENT"){
            console.error("File not found.");
        }
        else{
            console.error("Error reading file");
        }
        return;
    }
console.log(data);
});