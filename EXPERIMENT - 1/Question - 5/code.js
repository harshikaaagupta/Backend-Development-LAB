// Write a program that creates a Writable stream to write a string ("Hello, Node.js!") to a file (output.txt). If the file already exists, overwrite it. Print a success message once the data is written.

const fs = require("fs");
const writeStream = fs.createWriteStream("output.txt","utf-8");
writeStream.write("Harshika here !!");

