const http = require("http");

const data = JSON.stringify({
  fullName: "Test User",
  email: "testuser@example.com",
  password: "password123",
});

const options = {
  hostname: "localhost",
  port: 4000,
  path: "/api/auth/register",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${body}`);
    process.exit(0);
  });
});

req.on("error", (error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});

req.write(data);
req.end();
