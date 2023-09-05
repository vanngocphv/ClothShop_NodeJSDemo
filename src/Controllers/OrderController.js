const limitItem = 6;

const GetOrders = async (datas) => {
  const url = "/api/orders";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      datas.push({
        success: data.success,
        status: data.status,
        msg: data.msg,
        data: data.data,
      });
    });
};

const GetOrdersByPage = async (datas, page) => {
  const url = "http://localhost:5000/api/orders/page" + "?page=" + page;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      datas.push({
        success: data.success,
        status: data.status,
        msg: data.msg,
        data: data.data,
      });
    });
};

const GetOrderPage = async (req, res) => {
  let { page } = req.query;
  page = HandlePageValue(page);

  let orders = [];
  await GetOrdersByPage(orders, page);

  //handle page, maxpage
  let maxCount = orders[0].data.count;
  let maxPage = Math.ceil(maxCount / limitItem);

  res.render("order.ejs", {
    pageTitle: "List Orders Page",
    page: page + 1,
    maxPage: maxPage,
    pageActive: "Order",
    orders: orders[0].data.rows,
  });
};

module.exports = {
  GetOrderPage,
  GetOrders,
  GetOrdersByPage,
};

const HandlePageValue = (page) => {
  if (typeof page === "undefined" || !page) return 0;
  if (Number(page) < 1) return 0;
  return Number(page) - 1;
};
