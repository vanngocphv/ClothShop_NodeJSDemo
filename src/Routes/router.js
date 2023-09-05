const express = require("express");
const ClothController = require("../Controllers/ClothController");
const PageController = require("../Controllers/PageController");
const CartController = require("../Controllers/CartController");
const MiddlewareController = require("../Controllers/MiddlewareController");
const ManagerController = require("../Controllers/ManagerController");
const OrderController = require("../Controllers/OrderController");

const normalRouter = express.Router();

//router action
normalRouter.get("/", ClothController.GetAllClothes);
//router get all
normalRouter.get("/products", ClothController.GetAllProducts);

//router get men item
normalRouter.get("/products/men", (req, res) => {
  ClothController.GetProductsByType(req, res, 1);
});
//router get women item
normalRouter.get("/products/women", (req, res) => {
  ClothController.GetProductsByType(req, res, 2);
});
//router get kid item
normalRouter.get("/products/kid", (req, res) => {
  ClothController.GetProductsByType(req, res, 3);
});
//router get accessory item
normalRouter.get("/products/accessory", (req, res) => {
  ClothController.GetProductsByType(req, res, 4);
});

//router get accessory item
normalRouter.get("/products/accessory", (req, res) => {
  OrderController.GetOrdersByPage(req, res);
});

//router get detail
normalRouter.get(
  "/products/:id",
  MiddlewareController.CheckValidId,
  ClothController.GetDetailCloth
);

//router get cart
normalRouter.get("/cart", CartController.GetCartPage);

//router get manager
normalRouter.get("/manager", ManagerController.GetManagerPage);

//router get order
normalRouter.get("/orders", OrderController.GetOrderPage);

//router get contact page
normalRouter.get("/pages/contact", PageController.GetContactPage);

//router get about page
normalRouter.get("/pages/about", PageController.GetAboutPage);

//router action
normalRouter.get("/not-found", PageController.GetNotFoundPage);

module.exports = normalRouter;
