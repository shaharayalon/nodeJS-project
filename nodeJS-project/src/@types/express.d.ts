import { Request } from "express";
import { ICard, IUser } from "./user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      card?: ICard;
    }
  }
}
