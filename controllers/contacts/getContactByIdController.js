const { setSuccessResponse } = require("../../helpers");
const { NotFound } = require("http-errors");
const { getContactById } = require("../../models/contacts");

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(setSuccessResponse(200, contact));
};

module.exports = getContactByIdController;