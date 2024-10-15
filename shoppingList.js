const fs = require("fs");
const path = require("path");
const http = require("http");

// Helper functions to handle JSON file operations
const dataFilePath = path.join(__dirname, "data", "shopping-list.json");

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

// Utility function to send a JSON response
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Utility function to parse the body of POST/PUT requests
const parseRequestBody = (req, callback) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      callback(parsedBody);
    } catch (err) {
      callback(null);
    }
  });
};

// HTTP server request handler
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET all items
  if (method === "GET" && url === "/items") {
    const items = readData();
    sendJSON(res, 200, items);

    // GET a specific item by ID
  } else if (method === "GET" && url.match(/\/items\/\d+/)) {
    const id = parseInt(url.split("/")[2]);
    const items = readData();
    const item = items.find((i) => i.id === id);
    if (item) {
      sendJSON(res, 200, item);
    } else {
      sendJSON(res, 404, { message: "Item not found" });
    }

    // POST a new item
  } else if (method === "POST" && url === "/items") {
    parseRequestBody(req, (body) => {
      if (body && body.name && body.quantity) {
        const items = readData();
        const newItem = {
          id: items.length ? items[items.length - 1].id + 1 : 1,
          name: body.name,
          quantity: body.quantity,
        };
        items.push(newItem);
        writeData(items);
        sendJSON(res, 201, newItem);
      } else {
        sendJSON(res, 400, { message: "Invalid data" });
      }
    });

    // PUT (update) an item by ID
  } else if (method === "PUT" && url.match(/\/items\/\d+/)) {
    const id = parseInt(url.split("/")[2]);
    parseRequestBody(req, (body) => {
      const items = readData();
      const itemIndex = items.findIndex((i) => i.id === id);
      if (itemIndex >= 0) {
        items[itemIndex] = {
          id: items[itemIndex].id,
          name: body.name || items[itemIndex].name,
          quantity: body.quantity || items[itemIndex].quantity,
        };
        writeData(items);
        sendJSON(res, 200, items[itemIndex]);
      } else {
        sendJSON(res, 404, { message: "Item not found" });
      }
    });

    // DELETE an item by ID
  } else if (method === "DELETE" && url.match(/\/items\/\d+/)) {
    const id = parseInt(url.split("/")[2]);
    const items = readData();
    const filteredItems = items.filter((i) => i.id !== id);
    if (items.length !== filteredItems.length) {
      writeData(filteredItems);
      res.writeHead(204);
      res.end();
    } else {
      sendJSON(res, 404, { message: "Item not found" });
    }

    // Handle invalid routes
  } else {
    sendJSON(res, 404, { message: "Route not found" });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
