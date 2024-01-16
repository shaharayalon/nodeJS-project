import Joi from "joi";
import { IBusiness } from "../@types/user";

const likesValidationSchema = Joi.object<IBusiness>({
  
});

export { likesValidationSchema as joiBusinessSchema };
