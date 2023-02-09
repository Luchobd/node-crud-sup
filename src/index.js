const http = require("http");
const { bodyParser } = require("./lib/bodyParser");

let database = [];

function getTaskHandeler(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(database));
  res.end();
}

async function createTaskHandle(req, res) {
  try {
    await bodyParser(req);
    database.push(req.body);
    console.log(req.body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(database));
    res.end();
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Datos Invalidos");
    res.end();
  }
}

const server = http.createServer((req, res) => {
  const { url, method } = req;

  switch (method) {
    case "GET":
      if (url === "/") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ message: "Buenas Muchachos funciono a la primera" })
        );
        res.end();
      }
      if (url === "/tasks") {
        getTaskHandeler(req, res);
      }
      break;
    case "POST":
      if (url === "/tasks") {
        createTaskHandle(req, res);
      }
      break;
    //   case "PUT":
    //   case "DELETE":
    //   default
  }

  console.log(`URL: ${url} - Method: ${method}`);
});

server.listen(4500);
console.log("Server on port", 4500);
