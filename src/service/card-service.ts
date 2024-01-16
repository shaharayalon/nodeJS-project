import { ICardInput } from "../@types/user";
import { Card } from "../database/model/card-model";

const createCard = async (cardData: ICardInput, userId: string) => {
  const card = new Card(cardData);
  card.userId = userId;

  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Card.findOne({ bizNumber: random });
    if (!dbRes) {
      card.bizNumber = random;
      break;
    }
  }

  return card.save();
};

export { createCard };
