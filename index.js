// const https = require("https");
const http = require("http");
console.log(process.env.LIVE_SECRET_KEY);

const params = JSON.stringify({
  email: "info@victoriavisaconsultants.com",
  amount: "500",
});

const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.LIVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
};

const req = http
  .request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

// req.write(params);
// req.end();

// Create a simple HTTP server to listen on a port
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Payment server is running" }));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(JSON.stringify({ message: `Server running at port ${PORT}` }));
});
