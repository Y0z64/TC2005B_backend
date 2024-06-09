const descriptionModel = require("../models/descriptionModel");

async function getDescriptionById(req, res) {
  const { id } = req.params;
  try {
    const description = await descriptionModel.getDescriptionById(id);
    res.status(200).json(description);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function createDescription(req, res) {
  try {
    const { userId } = req.params;
    const { description, prescription } = req.body;
    const newDescription = await descriptionModel.createDescription(
      description,
      prescription,
      userId
    );
    res.status(201).json(newDescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function deleteDescriptions(req, res) {
  try {
    const { userId } = req.params;
    const deletedRowCount = await descriptionModel.deleteDescriptionsByUserId(
      userId
    );
    if (deletedRowCount > 0) {
      res
        .status(200)
        .json({
          message: `Successfully deleted ${deletedRowCount} descriptions.`,
        });
    } else {
      res.status(404).json({ message: "No descriptions found for this user." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getDescriptionById, createDescription, deleteDescriptions };
