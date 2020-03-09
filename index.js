const axios = require("axios");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ welcome: "Home" });
});

app.get("/:key", (req, res) => {
  const ip = process.env.HOST_IP;
  const key = req.params.key;
  return axios
    .get("http://" + ip + ":8500/v1/kv/" + key)
    .then(result => {
      const config = result.data[0].Value;
      const value = Buffer.from(config, "base64").toString("ascii");

      return res.json({ key, value });
    })
    .catch(err => {
      return res.json({ error: err });
    });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
