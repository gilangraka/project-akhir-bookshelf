const Joi = require("joi");
const controller = require("./controller");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: controller.store,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          year: Joi.date().required(),
          author: Joi.string().required(),
          summary: Joi.string().required(),
          publisher: Joi.string().required(),
          pageCount: Joi.number().required(),
          readPage: Joi.number().required(),
          reading: Joi.bool().required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: controller.index,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: controller.show,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: controller.update,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          year: Joi.date().required(),
          author: Joi.string().required(),
          summary: Joi.string().required(),
          publisher: Joi.string().required(),
          pageCount: Joi.number().required(),
          readPage: Joi.number().required(),
          reading: Joi.bool().required(),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: controller.destroy,
  },
];
