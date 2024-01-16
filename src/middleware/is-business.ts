import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user-model";
import { BizCardsError } from "../error/biz-cards-error";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });
    if (!user) {
      throw new BizCardsError("user does not exist", 401);
    }
    req.user = user;
    const isBusiness = user?.isBusiness;
    if (isBusiness) {
      return next();
    }
    throw new BizCardsError("user must be business", 401);
  } catch (err) {
    next(err);
  }
};

export { isBusiness };
