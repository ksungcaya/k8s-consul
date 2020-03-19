const axios = require("axios");
const express = require("express");
const fs = require("fs");
const qs = require("qs");

const app = express();
const ip = process.env.HOST_IP;
const vaultUrl = `${process.env.VAULT_ADDR}`;

function getConsulConfig(key) {
    return axios
        .get("http://" + ip + ":8500/v1/kv/" + key)
        .then(result => {
            const config = result.data[0].Value;

            Promise.resolve(Buffer.from(config, "base64").toString("ascii"));
        });
}

function getVaultConfig(auth) {
    const { data } = auth;
    const token = data.auth.client_token;
    const configs = "secret/data/app/config"

    return axios.get(`${vaultUrl}/v1/${configs}`, {
        headers: { "X-Vault-Token": token }
    }).then(response => Promise.resolve(response.data));
}

app.get("/", (req, res) => {
    res.json({ welcome: "Home" });
});

app.get("/:key", async (req, res) => {
    try {
        const { key } = req.params;
        const jwt = fs.readFileSync(process.env.JWT_PATH, "utf-8");
        const authPath = "auth/kubernetes/login";

        const auth = await axios.post(`${vaultUrl}/v1/${authPath}`, {
            role: "app", // from setup (value was originally "webapp" from the guide)
            jwt
        });

        const { data } = await getVaultConfig(auth);
        let value = null;
        let version = null;

        if (data.data && data.data[key]) {
            const { metadata } = data;
            value = data.data[key];
            version = metadata.version;
        }

        res.json({ key, value, version });
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
