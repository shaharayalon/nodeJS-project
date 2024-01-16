import { joiCardSchema } from "../../joi/card-joi";
import { joiBusinessSchema } from "../../joi/change-isBusiness-joi";
import { joiLoginSchema } from "../../joi/login-joi";
import { joiUserSchema } from "../../joi/user-joi";
import { validateSchema } from "./validate-schema";

// syntactic sugar
const validateUserRegistration = validateSchema(joiUserSchema);
const validateLogin = validateSchema(joiLoginSchema);
const validateCardCreate = validateSchema(joiCardSchema);
const validateBusiness = validateSchema(joiBusinessSchema);

export {
  validateUserRegistration,
  validateLogin,
  validateCardCreate,
  validateBusiness,
};
