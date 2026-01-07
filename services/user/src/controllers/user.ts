import type { Request, Response } from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../utils/TryCatch.js";
import type { AuthenticatedRequest } from "../middleware/isAuth.js";

export const loginUser = TryCatch(async (req, res) => {
  const { email, name, image } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, image });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
  });

  res.status(200).json({
    message: "User logged in successfully",
    user,
    token,
  });
});

export const myProfile = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    res.json(user);
  }
);

export const getUserProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(404).json({
      message: "User not found"
    });
    return;
  }
  res.json(user);
});

export const updateUser = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { name, bio, facebook, instagram, linkedin} = req.body;

  const user = await User.findByIdAndUpdate(req.user?._id, {
    name,
    bio,
    facebook,
    instagram,
    linkedin
  }, {
    new: true
  });

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
  });

  res.status(200).json({
    message: "User Updated successfully",
    user, 
    token,
  })
})
