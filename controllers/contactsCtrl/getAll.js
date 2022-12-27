const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const query = favorite ? { owner, favorite } : { owner };
  const skip = (page - 1) * limit;
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  })

  res.status(200).json(result);
};

module.exports = getAll;
