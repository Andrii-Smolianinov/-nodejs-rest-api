const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id, owner });

  if (!result) {
    throw HttpError(404, "Pages Not Found");
  }

  res.status(200).json(result);
};

module.exports = getById;
