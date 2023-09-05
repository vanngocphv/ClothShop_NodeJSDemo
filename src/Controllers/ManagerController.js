const Clothes = async (arrays, query) => {
  const url = "http://localhost:5000/api/products/" + query;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      arrays.push({
        success: data.success,
        status: data.status,
        maxPage: data.maxPage,
        msg: data.msg,
        data: data.data,
      });
    });
};

const GetManagerPage = async (req, res) => {
  //get page and handling
  let { page } = req.query;
  page = HandlePAgeValue(page);

  //get all clothes value in current page
  let clothes = [];
  await Clothes(clothes, "?page=" + page);
  //check if valid
  if (clothes[0].status == 200) {
    return res.render("manager.ejs", {
      page: Number(page) + 1,
      maxPage: Number(clothes[0].maxPage),
      pageTitle: "Manager Clothes Page",
      pageActive: "Manager",
      products: clothes[0].data["rows"],
    });
  }
  return res.render("manager.ejs", {
    page: Number(page) + 1,
    maxPage: 0,
    pageTitle: "Manager Clothes Page",
    pageActive: "Manager",
    products: undefined,
  });
};

module.exports = {
  GetManagerPage,
};

const HandlePAgeValue = (page) => {
  if (typeof page === "undefined" || !page) {
    return 0;
  }

  page = Number(page) < 1 ? 0 : Number(page) - 1;
  return page;
};
