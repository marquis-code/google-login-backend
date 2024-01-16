const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "please enter an email"],
        unique: [true, "email already exists in database!"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'
        }
        // validate: [isEmail, "Please enter a valid email"],
      },
      password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
      },
  });
  
  const User = mongoose.model("user", UserSchema);

  module.exports = User;
  