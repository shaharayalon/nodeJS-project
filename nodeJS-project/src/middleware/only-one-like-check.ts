import { RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";

const onlyOneLikeCheck: RequestHandler = async (req, res, next) => {
  try {
    const likes = req.card?.likes!;
    const { email } = req.body;

    for (let like of likes) {
      if (like == email) {
        throw new BizCardsError("you liked it already", 400);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { onlyOneLikeCheck };
