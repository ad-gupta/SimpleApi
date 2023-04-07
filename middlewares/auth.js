import { User } from "../Models/userModel.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, resp, next) => {
    const {token} = await req.cookies;

    if(!token) {
        return resp.status(404).json({
            success: false,
            message: "Login First"
        })
    }

    const id = jwt.verify(token, process.env.RANDOM_SECRET)
    req.user = await User.findById(id)
    next();
}