const Order = require("../Models/order");
const limitItem = 6;

const allOrder = async () => {
  return Order.findAll({
    attributes: ["order_id", "name", "email", "message", "products", "amount"],
  });
};
const ordersByPage = async (page) => {
  const offset = Number(page) * limitItem;
  return Order.findAndCountAll({
    limit: limitItem,
    offset: offset,
    attributes: ["order_id", "name", "email", "message", "products", "amount"],
  });
};
const order = async (id) => {
  return Order.findAll({
    attributes: ["order_id", "name", "email", "message", "products", "amount"],
    where: {
      order_id: Number(id),
    },
  });
};

const GetAllOrder = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      status: 200,
      msg: "Get Success",
      data: await allOrder(),
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Get Failed, error msg: ${err}`,
      data: [],
    });
  }
};

const GetOrderByPage = async (req, res) => {
  let { page } = req.query;

  try {
    return res.status(200).json({
      success: true,
      status: 200,
      msg: "Get Success",
      data: await ordersByPage(page),
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Get Failed, error msg: ${err}`,
      data: [],
    });
  }
};

const CreateNewOrder = async (req, res) => {
  const { name, email, message, products, amount } = req.body;

  let invalidField = [];
  let invalid = false;
  if (!name || typeof name === "undefined") {
    invalidField.push("name");
    invalid = true;
  }
  if (!email || typeof email === "undefined") {
    invalidField.push("email");
    invalid = true;
  }
  if (!message || typeof message === "undefined") {
    invalidField.push("message");
    invalid = true;
  }
  if (!products || typeof products === "undefined") {
    invalidField.push("products");
    invalid = true;
  }
  if (!amount || typeof amount === "undefined") {
    invalidField.push("amount");
    invalid = true;
  }

  if (invalid) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: "Please fill up required field",
      data: invalidField,
    });
  }

  //try insert if no error from checking above
  try {
    await Order.create({
      name: name,
      email: email,
      message: message,
      products: products,
      amount: amount,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Cannot Insert, has error occurs: ${err}`,
    });
  }

  return res.status(200).json({
    success: true,
    status: 200,
    msg: `Insert success`,
    data: await allOrder(),
  });
};

module.exports = {
  GetAllOrder,
  CreateNewOrder,
  GetOrderByPage,
};
