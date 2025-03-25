import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    // split token and get first element
    const token = req.header.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ successs: false, error: "Token Not Provided" });
    }

    // verify key
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    // if token is wrong
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }
    // findby by id
    const user = await User.findById({ _id: decoded._id }).select("-password");

    // if user is not found return status code 404
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default verifyUser;
