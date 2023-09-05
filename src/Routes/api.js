const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const ClothAPIController = require("../Controllers/ClothAPIController");
const ContactApiController = require("../Controllers/ContactAPIController");
const MiddlewareController = require("../Controllers/MiddlewareController");
const OrderAPIController = require("../Controllers/OrderAPIController");

const apiRouter = express.Router();

apiRouter.get("/products", (req, res) => {
  ClothAPIController.GetClothes(req, res);
});
apiRouter.get("/products/men", async (req, res) => {
  ClothAPIController.GetClothes(req, res, 1);
});

apiRouter.get("/products/women", async (req, res) => {
  ClothAPIController.GetClothes(req, res, 2);
});

apiRouter.get("/products/kid", async (req, res) => {
  ClothAPIController.GetClothes(req, res, 3);
});

apiRouter.get("/products/accessory", async (req, res) => {
  ClothAPIController.GetClothes(req, res, 4);
});
apiRouter.get(
  "/products/:id",
  MiddlewareController.CheckValidIdAPI,
  ClothAPIController.GetDetailCloth
);
apiRouter.put(
  "/products/:id",
  MiddlewareController.CheckValidIdAPI,
  ClothAPIController.UpdateCloth
);
apiRouter.delete(
  "/products/:id",
  MiddlewareController.CheckValidIdAPI,
  ClothAPIController.DeleteCloth
);

//create
apiRouter.post("/products/create", ClothAPIController.CreateCloth);

//orders
//get all orders
apiRouter.get("/orders", OrderAPIController.GetAllOrder);
//get by page
apiRouter.get("/orders/page", OrderAPIController.GetOrderByPage);
//create new orders
apiRouter.post("/orders/create", OrderAPIController.CreateNewOrder);

//contact
apiRouter.get("/contacts", (req, res) => {
  ContactApiController.GetContactUsers(req, res);
});

apiRouter.get("/contacts/:id", (req, res) => {
  ContactApiController.GetContactUsers(req, res);
});

apiRouter.post("/contacts/create", (req, res) => {
  ContactApiController.CreateNewContact(req, res);
});

apiRouter.post("/upload/image", (req, res) => {
  const form = new formidable.IncomingForm();
  //console.log(path.resolve(__dirname, "../../Public/assets/images/"));
  const uploadFolder = path.resolve(__dirname, "../../Public/assets/images/");
  form.multiples = false;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;
  form.options.filename = "newfile" + Date.now() + ".jpg";

  form.parse(req, function (err, fields, file) {
    var currentFile = path.resolve(uploadFolder, file.image[0].newFilename);
    var newFileName = path.resolve(
      uploadFolder,
      file.image[0].newFilename + file.image[0].originalFilename
    );
    var returnFileName =
      "assets/images/" +
      file.image[0].newFilename +
      file.image[0].originalFilename;
    fs.rename(currentFile, newFileName, function (err) {
      if (err) throw err;
      res.status(200).json({
        success: true,
        status: 200,
        data: [{ filename: returnFileName }],
      });
    });
  });
});

//not found
apiRouter.get("/not-found", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    msg: "The page cannot be found",
    data: [],
  });
});

module.exports = apiRouter;
