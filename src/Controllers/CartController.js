const GetCartPage = async (req, res) => {
  res.render("cart.ejs", { pageTitle: "Cart", pageActive: "Cart" });
};

module.exports = {
  GetCartPage,
};
