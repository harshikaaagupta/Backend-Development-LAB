// Write a program that demonstrates stream piping. Use a Readable stream to read data from a file (input.txt), and pipe it to a Writable stream that writes to another file (output.txt).

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");

const readStream = fs.createReadStream(inputPath, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(outputPath, { encoding: "utf-8" });

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Data successfully piped.");
});

writeStream.on("error", (err) => {
  console.error("Error writing file:", err);
});
