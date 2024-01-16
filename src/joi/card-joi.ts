import Joi from "joi";
import { IAddress, ICard, IImage } from "../@types/user";
import { phoneRegex } from "./patterns";

const cardValidationSchema = Joi.object<ICard>({
  title: Joi.string().min(2).required(),
  subtitle: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  phone: Joi.string().min(9).max(11).required().pattern(phoneRegex),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  web: Joi.string().uri().allow(""),
  image: Joi.object<IImage>({
    url: Joi.string().min(5).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object<IAddress>({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(2).max(256).required(),
    zip: Joi.string().min(2).max(256).allow(""),
  }).required(),
});

export { cardValidationSchema as joiCardSchema };
