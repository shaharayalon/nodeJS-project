import { RequestHandler } from "express";
import path from "path";

// The last middleware in the chain:
const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

export { notFound };
