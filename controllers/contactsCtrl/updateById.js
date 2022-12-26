const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
};

module.exports = updateById;
