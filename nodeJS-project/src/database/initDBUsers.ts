import { Logger } from "../logs/logger";
import { cards } from "./initCards";
import { users } from "./initUsers";
import { Card } from "./model/card-model";
import { User } from "./model/user-model";
const initDBUsers = async () => {
  //how many users:

  //add 3 users
  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;

  for (let user of users) {
    const saved = await new User(user).save();
    Logger.verbose("Added user: ", saved);
  }
};

export { initDBUsers };
