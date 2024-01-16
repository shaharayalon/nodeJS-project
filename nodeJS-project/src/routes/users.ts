import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user-model";
import {
  validateBusiness,
  validateLogin,
  validateUserRegistration,
} from "../middleware/validation";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { checkUser, createUser } from "../service/user-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is-user";
import { auth } from "../service/auth-service";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = (await User.findById(id).lean()) as IUser;
    const { password, ...rest } = user;
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

router.post("/", validateUserRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    //check the request
    const { email, password } = req.body as ILogin;
    // call the service
    const jwt = await checkUser(email, password);
    // response
    res.json(jwt);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isUser, validateUserRegistration, async (req, res, next) => {
  try {
    req.body.password = await auth.hashPassword(req.body.password);
    const savedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", isUser, validateBusiness, async (req, res, next) => {
  try {
    const savedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
