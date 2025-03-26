import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    // check for authorization header
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Recieved token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Token Not Provided" });
    }

    // verify token
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    // if token is wrong return
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token Not Valid" });
    }
    // findby by id
    const user = await User.findById({ _id: decoded._id }).select("-password");

    // if user is not found return status code 404
    if (!user) {
      return res.status(401).json({ success: false, error: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyUser:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default verifyUser;
