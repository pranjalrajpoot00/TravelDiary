import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (err) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User Already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      result,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went Wrong." });
  }
};
