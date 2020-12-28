const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const queryString = require("query-string");

const app = express();

app.use(express.static("public"));

const env = require("./env");

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());


app.get("/lol", async (req, res) => {
  res.send("fuck off!");
});

app.get("/getAppleLoginUrl", async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: "com.login.test.eg.app",
    redirect_uri: `https://${req.get("host")}/api/auth/apple`,
    scope: ["email", "name"].join(" "),
    response_type: "code id_token",
    state: "",
    response_mode: "form_post",
    // usePopup: true
  });

  const appleLoginUrl = `https://appleid.apple.com/auth/authorize?${stringifiedParams}`;
  res.send({ appleLoginUrl });
});

app.post('/api/auth/apple', async (req, res) => {
  return res.send(req.body);
})

app.listen(env.PORT, () => console.log(`app is running on port ${env.PORT}`));
