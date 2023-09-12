const express = require("express");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameIsJayAnandILiveInBanglore@#$";

router.post(
  "/createuser",
  [
    body("email", "Invalid email").isEmail(),
    body("username", "Invalid username").isLength({ min: 5 }),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let usermail = await User.findOne({ email });
      if (!usermail) {
        return res.status(400).json({ errors: "try logging correct id!" });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        usermail.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "try logging correct id!" });
      }

      const data = {
        user: {
          id: usermail.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
