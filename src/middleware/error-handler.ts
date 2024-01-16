import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";
import { BizCardsError } from "../error/biz-cards-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(err);
  //userService Error
  if (err instanceof BizCardsError) {
    return res.status(err.status).json({ message: err.message });
  }

  //mongoose error...
  if (err.code && err.code === 11000 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate Key - Must be Unique",
      property: err.keyValue,
      index: err.keyPattern,
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  //catchall
  return res.status(500).json({ message: "Internal Server Error" });
};

export { errorHandler };
