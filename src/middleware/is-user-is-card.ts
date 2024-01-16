import { Request, RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user-model";
import { extractToken } from "./is-admin";
import { validateToken } from "./validate-token";
import { ICard, IUser } from "../@types/user";
import { Card } from "../database/model/card-model";
import { Logger } from "../logs/logger";

const isUserIsCard: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    if (!user) throw new BizCardsError("User does not exist", 401);
    const { email: userEmail } = req.body;
    if (email != userEmail) {
      Logger.info(email);
      Logger.error(userEmail);
      throw new BizCardsError("please write your email", 400);
    }
    req.user = user;
    const cardById = (await Card.findById(id).lean()) as ICard;
    if (!cardById) throw new BizCardsError("Card does not exist", 401);
    req.card = cardById;
    return next();
  } catch (e) {
    next(e);
  }
};

export { isUserIsCard };
