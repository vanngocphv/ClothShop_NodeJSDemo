const Cloth = require("../Models/cloth");
const ClothCategory = require("../Models/clothCategory");
const clothCat = Cloth.belongsTo(ClothCategory);
const limitItem = 6;

const clothes = (number = 0, page = 0) => {
  const offset = Number(page) * limitItem;
  if (number == 0) {
    return Cloth.findAndCountAll({
      limit: limitItem,
      offset: offset,
      attributes: ["cloth_id", "name", "image", "price", "description", "type"],
    });
  } else {
    return Cloth.findAndCountAll({
      limit: limitItem,
      offset: offset,
      attributes: ["cloth_id", "name", "image", "price", "description", "type"],
      where: {
        type: Number(number),
      },
    });
  }
};

const getClothById = (id) => {
  return Cloth.findAll({
    attributes: ["cloth_id", "name", "image", "price", "description", "type"],
    where: {
      cloth_id: Number(id),
    },
  });
};

const GetClothes = async (req, res, number = 0) => {
  let { page } = req.query;
  let rowsCount, totalCount;
  await clothes(number, page).then((data) => {
    rowsCount = data["rows"].length;
    totalCount = data["count"];
  });
  if (Number(rowsCount) == 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: `Not found data from page ${page}`,
      data: [],
    });
  }

  let maxPage = Math.ceil(Number(totalCount) / limitItem);
  res.status(200).json({
    success: true,
    status: 200,
    msg: "Success",
    maxPage: Number(maxPage),
    data: await clothes(number, page),
  });
};

const GetDetailCloth = async (req, res) => {
  const { id } = req.params;
  const data = await getClothById(id);

  if (!data) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: `Not Found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    status: 200,
    msg: `Found`,
    data: data,
  });
};
const CreateCloth = async (req, res) => {
  let isNullValue = false;
  let nullableField = [];
  let { name, image, price, description, type } = req.body;
  if (!name) {
    isNullValue = true;
    nullableField.push({ fields: "name" });
  }
  if (!image) {
    isNullValue = true;
    nullableField.push({ fields: "image" });
  }
  if (!price) {
    isNullValue = true;
    nullableField.push({ fields: "price" });
  }
  if (!type) {
    isNullValue = true;
    nullableField.push({ fields: "type" });
  }
  description = !description ? "" : description;
  if (isNullValue) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Cannot Insert, Please fill up required fields`,
      data: nullableField,
    });
  }

  try {
    await Cloth.create(
      {
        name: name,
        image: image,
        price: price,
        description: description,
        type: Number(type),
      },
      {
        include: [clothCat],
      }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Cannot Insert, has error occurs: ${err}`,
    });
  }

  res.status(200).json({
    success: true,
    status: 200,
    msg: `Insert success`,
    data: await clothes(),
  });
};

const UpdateCloth = async (req, res) => {
  const { id } = req.params;
  const item = await getClothById(id);
  if (!item) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: `Not Found with ${id}`,
    });
  }

  let { name, image, price, description, type } = req.body;
  name = !name ? item.name : name;
  image = !image ? item.image : image;
  price = !price ? item.price : price;
  description = !description ? item.description : description;
  type = !type ? item.type : type;

  try {
    await Cloth.update(
      {
        name: name,
        image: image,
        price: price,
        description: description,
        type: Number(type),
      },
      {
        where: {
          cloth_id: id,
        },
      }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Cannot Delete, has error occurs: ${err}`,
    });
  }

  res.status(200).json({
    success: true,
    status: 200,
    msg: await getClothById(id),
  });
};

const DeleteCloth = async (req, res) => {
  const { id } = req.params;
  const item = await getClothById(id);
  if (!item) {
    return res.status(404).json({
      success: false,
      status: 404,
      msg: `Not Found with ${id}`,
    });
  }
  try {
    await Cloth.destroy({
      where: {
        cloth_id: id,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      msg: `Cannot Delete, has error occurs: ${err}`,
    });
  }

  res.status(200).json({
    success: true,
    status: 200,
    msg: `Item has been deleted successfully, id deleted ${id}`,
  });
};

module.exports = {
  GetClothes,
  GetDetailCloth,
  CreateCloth,
  UpdateCloth,
  DeleteCloth,
};
