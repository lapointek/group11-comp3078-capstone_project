import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDB from "./db/db.js";

const userRegister = async () => {
  await connectDB();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
