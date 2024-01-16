import { Logger } from "../logs/logger";
import { cards } from "./initCards";
import { Card } from "./model/card-model";
const initDBCards = async () => {
  const cardsCount = await Card.countDocuments();
  if (cardsCount != 0) return;

  for (let card of cards) {
    const savedCards = await new Card(card).save();
    Logger.info("Added card: ", savedCards);
  }
};

export { initDBCards };
