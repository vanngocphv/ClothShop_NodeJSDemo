const ContactUser = require("../Models/contactUser");

const Users = async () => {
  return await ContactUser.findAll({
    attribute: ["contactUser_id", "name", "email", "message"],
  });
};

const GetContactUsers = async (req, res) => {
  const { id } = req.params;
  const users = await Users();
  if (typeof id === "undefined" || !id) {
    if (users.length == 0) {
      return res.status(200).send({
        success: true,
        status: 200,
        msg: "No data return",
        data: [],
      });
    }
    return res.status(200).send({
      success: true,
      status: 200,
      msg: "Success",
      data: users,
    });
  } else {
    const returnUser = users.find((user) => user.contactUser_id == Number(id));
    if (returnUser)
      return res.status(200).send({
        success: true,
        status: 200,
        msg: "Success",
        data: returnUser,
      });
    else
      return res.status(404).send({
        success: false,
        status: 404,
        msg: `Cannot be found user with id ${id}`,
        data: [],
      });
  }
};

const CreateNewContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await ContactUser.create({
      name: name,
      email: email,
      message: message,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      status: 400,
      msg: `Error occurs, msg: ${err}`,
      data: [],
    });
  }

  const users = await Users();
  return res.status(200).send({
    success: true,
    status: 200,
    msg: `Create success`,
    data: users,
  });
};

module.exports = {
  GetContactUsers,
  CreateNewContact,
};
