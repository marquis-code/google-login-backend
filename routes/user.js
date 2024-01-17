const express = require("express");
const { google } = require("googleapis");
let router = express.Router();
require("dotenv").config();
const User = require("../model/user");

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errorMessage: "User Already Exist" });
    }

    const newUser = new User({
      email,
      password,
    });

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1EpjhwrKNpk0s_gLxRl_9Hg8uBCcjhcVz0HoyAaLGmO4";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1",
    });
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[email, password]],
      },
    });

    return res.status(200).json({
      successMessage: "Login was successful.",
    });

  } catch (error) {
    return res.json({
      errorMessage: "Something went wrong.",
    });
  }
});

router.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const spreadsheetId = "19LnsT1_XZzH93-Vhv3SbPTSdqwdqLZM2cH2c07mtkvI";
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["Make a tutorial", "test"]],
    },
  });
  res.status(200).json(getRows.data);
});

module.exports = router;
