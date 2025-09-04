// Write a program that creates a Writable stream to write a string ("Hello, Node.js!") to a file (output.txt). If the file already exists, overwrite it. Print a success message once the data is written.

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output.txt");

const writeStream = fs.createWriteStream(filePath, {
  flags: "w",
  encoding: "utf-8"
});

writeStream.write("Hello, Today is my first Backened Experiment");
writeStream.end();

writeStream.on("finish", () => {
  console.log("Data written successfully to", filePath);
});

writeStream.on("error", (err) => {
  console.error("Error writing file:", err);
});
