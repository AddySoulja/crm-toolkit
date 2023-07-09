const CustomersList = require("../models/customersListSchema");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });
    const customersList = await CustomersList.create({
      _id: user.email,
      list: [],
    });
    return res.status(201).json({
      ok: true,
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          token: generateToken(user._id),
        },
        customersList,
        message: "Registered successfully.",
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const customersList = await CustomersList.findById(user.email);
      return res.status(200).json({
        ok: true,
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            token: generateToken(user._id),
          },
          customersList,
          message: "Logged in successfully.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    if (user)
      return res.status(200).json({
        ok: true,
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            token: generateToken(user._id),
          },
        },
      });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { username, email, password } = req.body;

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      returnDocument: "after",
      new: true,
    });
    if (updateUser)
      return res.status(201).json({
        ok: true,
        data: {
          user: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            photo: updatedUser.photo,
            token: generateToken(updateUser._id),
          },
        },
      });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;
    const userFound = await User.findById({ _id: user._id });
    if (userFound && (await userFound.matchPassword(password))) {
      await User.deleteOne({ _id: user._id });
      return res
        .status(200)
        .json({ ok: true, message: "Account deleted successfully." });
    }
    return res.status(400).json({ ok: true, message: "Incorrect password." });
  } catch (error) {
    return res.status(500).json({ ok: false, error });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
  deleteUser,
};
