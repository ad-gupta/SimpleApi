// jwt to generate token in cookie
import jwt from "jsonwebtoken";

export const sendCookie = (newUser, resp, message, statusCode = 200) => {
  const token = jwt.sign({ _id: newUser._id }, process.env.RANDOM_SECRET);

  resp
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
