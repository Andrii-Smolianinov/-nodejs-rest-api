const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

module.exports = updateFavorite;
