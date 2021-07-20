import Joi from "joi";

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

const password = Joi.string().min(8).max(16).required();

const name = Joi.string().max(50).required();
const company = Joi.string().max(50).required();
const address = Joi.string().max(100);
const phone = Joi.string().max(11);
const required = Joi.string().required();

export const resetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({ email });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.status(400).json({ message: value.error.message });
  }

  next();
};

export const registerValidation = (req, res, next) => {
  const schema = Joi.object({ email, password, name, company, address, phone });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.status(400).json({ message: value.error.message });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({ email: required, password: required });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.status(400).json({ message: value.error.message });
  }

  next();
};
