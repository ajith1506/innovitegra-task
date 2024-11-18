const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email. Please try again.",
      });
    }

    const hashPassword = await bcrypt.hashSync(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compareSync(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
      },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );
    const { password: pass, ...rest } = checkUser._doc;

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        token,
        ...rest,
      });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred. Please try again.",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

module.exports = { registerUser, loginUser, logoutUser };
