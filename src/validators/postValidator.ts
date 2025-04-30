import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": `"Title" should be a type of 'text'`,
    "string.empty": `"Title" cannot be empty`,
    "string.min": `"Title" should have a minimum length of {#limit}`,
    "any.required": `"Title" is required`,
  }),
  description: Joi.string().min(10).required().messages({
    "string.base": `"Description" should be a type of 'text'`,
    "string.empty": `"Description" cannot be empty`,
    "string.min": `"Description" should have a minimum length of {#limit}`,
    "any.required": `"Description" is required`,
  }),
});
