const GetContactPage = (req, res) => {
  res.render("contact.ejs", { pageTitle: "Contact", pageActive: "More" });
};

const GetAboutPage = (req, res) => {
  res.render("about.ejs", { pageTitle: "About", pageActive: "More" });
};

const GetNotFoundPage = (req, res) => {
  res.render("not-found.ejs", { pageTitle: "Not Found", pageActive: "" });
};

module.exports = {
  GetContactPage,
  GetAboutPage,
  GetNotFoundPage,
};
