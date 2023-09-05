const path = require("path");
const ClothCategory = require("../Data/Enum/ClothCategories");
const limit = 6;

//function
const fetchData = async (arrays, target = "", query = "") => {
  const url = "http://localhost:5000/api/products/" + target + query;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      arrays.push({
        success: data.success,
        status: data.status,
        msg: data.msg,
        data: data.data,
      });
    });
};

const handlePageValue = (page) => {
  if (typeof page === "undefined") {
    return 0;
  }

  if (Number(page) < 1) return 0;

  return Number(page) - 1;
};

const GetAllClothes = async (req, res) => {
  let menClothes = [];
  let womenClothes = [];
  let kidClothes = [];
  let accessoryClothes = [];

  await fetchData(menClothes, "men");
  await fetchData(womenClothes, "women");
  await fetchData(kidClothes, "kid");
  await fetchData(accessoryClothes, "accessory");

  //return array with responding type, only first 3 item
  const men = menClothes[0].data["rows"].slice(0, 3);
  const women = womenClothes[0].data["rows"].slice(0, 3);
  const kid = kidClothes[0].data["rows"].slice(0, 3);
  const accessory = accessoryClothes[0].data["rows"].slice(0, 3);

  return res.render("index.ejs", {
    men: men,
    women: women,
    kid: kid,
    accessory: accessory,
    pageTitle: "Home",
    pageActive: "Home",
  });
};

const GetDetailCloth = async (req, res) => {
  const { id } = req.params;
  let datas = [];
  await fetchData(datas, id);

  // return res.sendFile(path.resolve(__dirname, "../views/single-product.html"));
  return res.render("product.ejs", {
    pageTitle: `Product ${datas[0].data[0].name}`,
    pageActive: "Shopping",
    product: datas[0].data[0],
  });
};

const GetAllProducts = async (req, res) => {
  //page handle
  let { page } = req.query;
  page = handlePageValue(page);

  //data return
  let datas = [];
  await fetchData(datas, "", "?page=" + page);

  //set for nav/pagination
  let countItems = datas[0].data["count"];
  let totalPage = Math.ceil(countItems / 6);

  return res.render("products.ejs", {
    totalPage: totalPage,
    currentPage: page + 1,
    pageTitle: `All products`,
    pageActive: "Shopping",
    products: datas[0].data["rows"],
  });
};

const GetProductsByType = async (req, res, type) => {
  //page handle
  let { page } = req.query;
  page = handlePageValue(page);

  //data return
  const nameType = ClothCategory[type];
  let datas = [];
  await fetchData(datas, nameType, "?page=" + page);

  //set for nav/pagination
  let countItems = datas[0].data["count"];
  let totalPage = Math.ceil(countItems / 6);

  return res.render("products.ejs", {
    totalPage: totalPage,
    currentPage: page + 1,
    pageTitle: `${nameType} products`,
    pageActive: "Shopping",
    products: datas[0].data["rows"],
  });
};

module.exports = {
  GetAllClothes,
  GetDetailCloth,
  GetAllProducts,
  GetProductsByType,
};
