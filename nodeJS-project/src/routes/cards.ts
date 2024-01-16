import { Router } from "express";
import { validateCardCreate } from "../middleware/validation";
import { ICardInput } from "../@types/user";
import { Card } from "../database/model/card-model";
import { createCard } from "../service/card-service";
import { isBusiness } from "../middleware/is-business";
import { BizCardsError } from "../error/biz-cards-error";
import { validateToken } from "../middleware/validate-token";
import { isCardsUser } from "../middleware/is-cards-user";
import { Logger } from "../logs/logger";
import { isUser } from "../middleware/is-user";
import { isUserIsCard } from "../middleware/is-user-is-card";
import { onlyOneLikeCheck } from "../middleware/only-one-like-check";
import { isCardsUserOrAdmin } from "../middleware/is-cards-user-or-admin";

const router = Router();

router.post("/", isBusiness, validateCardCreate, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new BizCardsError("user must have an id", 500);
    }
    const saved = await createCard(req.body as ICardInput, userId);

    res.status(201).json({ message: "Saved", card: saved });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    return res.json(allCards);
  } catch (err) {
    next(err);
  }
});

router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id!;
    Logger.verbose(userId);
    const myCards = await Card.find({ userId });

    return res.json(myCards);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cardById = await Card.findById(id);

    return res.json(cardById);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isCardsUser, validateCardCreate, async (req, res, next) => {
  try {
    const savedCard = await Card.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(savedCard);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", isUserIsCard, onlyOneLikeCheck, async (req, res, next) => {
  try {
    const userEmail = req.user?.email!;
    const savedCard = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: userEmail } },
      { new: true }
    );
    res.json(savedCard);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isCardsUserOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);
    res.json(deletedCard);
  } catch (err) {
    next(err);
  }
});
export { router as cardsRouter };
