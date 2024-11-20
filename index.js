const https = require("https");

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

const req = https
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
const server = https.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Server is running\n");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
