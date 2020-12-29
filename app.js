const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const queryString = require("query-string");
const {verifyIdToken: verifyAppleIdToken} = require("apple-signin-auth");

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


app.get("/getAppleLoginUrl", async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: env.CLIENT_ID,
    redirect_uri: `https://${req.get("host")}/apple/redirect`,
    scope: ["email", "name"].join(" "),
    response_type: "code id_token",
    state: "",
    response_mode: "form_post",
    // usePopup: true
  });

  const appleLoginUrl = `https://appleid.apple.com/auth/authorize?${stringifiedParams}`;
  res.send({ appleLoginUrl });
});

app.post('/apple/redirect', async (req, res) => {
  const { code, id_token, user } = req.body;
  const parsedUser = user ? JSON.parse(user) : {};
  const { email, name: { firstName, lastName } = {} } = parsedUser

  const { sub: userAppleId } = await verifyAppleIdToken(
    id_token,
    {
      audience: env.CLIENT_ID,
      ignoreExpiration: true,
    }
  );

  const data = {...req.body, userAppleId}
  res.send(data);
})

app.listen(env.PORT, () => console.log(`app is running on port ${env.PORT}`));
