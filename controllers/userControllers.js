import { User } from "../Models/userModel.js";
// hashing the password
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, resp) => {
  resp.send(await User.find({}));
};

export const register = async (req, resp, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return resp.status(404).json({
        success: false,
        message: "User Already Exist",
      });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    const message = "Registered successfully";
    sendCookie(newUser, resp, message, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, resp, next) => {
  try {
    const { email, password } = req.body;

    // because we have selected password as false in userSchema
    // so there would not be password available anymore so we
    // have to select all objects or simply "+___" while finding the user

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return resp.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return resp.status(404).json({
        success: false,
        message: "Invalid email or password",
      });

    sendCookie(user, resp, `Welcome back, ${user.username}`, 200);
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = (req, resp, next) => {
  try {
    resp.status(200).json({
      message: "Shown",
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, resp, next) => {
  try {
    resp
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      })
      .json({
        success: true,
        message: `successfully logout, ${req.user.username}`,
      });
  } catch (err) {
    next(err);
  }
};
