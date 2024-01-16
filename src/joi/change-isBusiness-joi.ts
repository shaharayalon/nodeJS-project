import Joi from "joi";
import { IBusiness } from "../@types/user";

const businessValidationSchema = Joi.object<IBusiness>({
  isBusiness: Joi.boolean().required(),
});

export { businessValidationSchema as joiBusinessSchema };
