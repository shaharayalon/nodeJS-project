import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { passwordRegex, phoneRegex } from "./patterns";

const userValidationSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).required(),
    middle: Joi.string().min(0).max(20).allow(""),
    last: Joi.string().min(2).max(20).required(),
  }),
  address: Joi.object<IAddress>({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(2).max(256).required(),
    zip: Joi.string().min(2).max(256).allow(""),
  }).required(),
  image: Joi.object<IImage>({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  phone: Joi.string().min(9).max(11).required().pattern(phoneRegex),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  password: Joi.string().pattern(passwordRegex).min(7).max(20).required(),
  isBusiness: Joi.boolean().required(),
  // isAdmin: Joi.boolean().optional(),
  // createdAt: Joi.date().optional(),
});

export { userValidationSchema as joiUserSchema };
