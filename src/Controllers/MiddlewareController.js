const CheckValidId = (req, res, next) => {
  let { id } = req.params;
  if (isNaN(Number(id))) {
    res.redirect("/not-found");
  } else {
    next();
  }
};

const CheckValidIdAPI = (req, res, next) => {
  let { id } = req.params;
  if (isNaN(Number(id))) {
    res.redirect("/api/not-found");
  } else {
    next();
  }
};

module.exports = {
  CheckValidId,
  CheckValidIdAPI,
};
