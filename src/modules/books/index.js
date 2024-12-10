const Joi = require("joi");
const controller = require("./controller");

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: controller.store,
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
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: controller.destroy,
  },
];
