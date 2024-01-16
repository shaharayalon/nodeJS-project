import mongoose from "mongoose";
import { cardSchema } from "../schema/cards-schema";

const Card = mongoose.model("cards", cardSchema);

export { Card };
