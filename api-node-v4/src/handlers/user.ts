import { validationResult } from "express-validator";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  console.log(user);
  console.log(req.body);
  const isValid = await comparePasswords(req.body.password, user.password);
  console.log(isValid);
  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
  }

  const token = createJWT(user);
  res.json({ token });
};
