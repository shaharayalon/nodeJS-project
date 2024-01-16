import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user-model";
import { ICard, IUser } from "../@types/user";
import { Card } from "../database/model/card-model";
import { Logger } from "../logs/logger";
import { BizCardsError } from "../error/biz-cards-error";

const isCardsUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    if (!user) throw new BizCardsError("User does not exist", 401);
    const cardById = (await Card.findById(id).lean()) as ICard;
    if (!cardById) throw new BizCardsError("Card does not exist", 401);
    if (cardById.userId == user._id) {
      Logger.info("wow");
      return next();
    }
    res.status(401).json({ message: "The card must belong to the user" });
  } catch (err) {
    next(err);
  }
};

export { isCardsUser };
