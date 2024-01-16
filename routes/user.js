const express = require("express");
let router = express.Router();
require("dotenv").config();
const User = require("../model/user");
router.post('/signin', async (req, res) => {
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
    
        newUser.save()
          .then((result) => {
            return res.status(200).json({
                successMessage:
                  "Login was successful.",
              });
          })
          .catch((error) => {
            return res.json({
              errorMessage:
                "Something went wrong, while saving admin user account, please try again.",
            });
          });
      } catch (error) {
        return res.json({
            errorMessage:
              "Something went wrong.",
          });
      }
  });
  
  module.exports = router;