const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndRemove({ _id, owner })

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({
    message: "Delete success",
  });
};

module.exports = removeById;
