// Reading a text file on the server using http and fs module.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Use absolute path to avoid file not found issues
const filePath = path.join(__dirname, "hello.txt");

const server = http.createServer((req, res) => {
    // Read the file asynchronously
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("File not found.");
            } else {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error reading file.");
            }
            return;
        }

        // Send file content as response
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
