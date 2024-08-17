const express = require("express");
const router = express.Router();
const SellingLand = require("../models/SellingLand");

// Middleware for CORS
router.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT, OPTIONS",
  });
  next();
});

// GET request to fetch all land details
router.get("/", async (req, res) => {
  try {
    const details = await SellingLand.find();
    res.status(200).json(details);
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

// POST request to add new land details
router.post("/", async (req, res) => {
  if (!req.body.owner || !req.body.propertyID) {
    return res.status(400).send({ message: "Please enter the required fields" });
  }

  try {
    const land_details = {
      owner: req.body.owner,
      request: req.body.request,
      propertyID: req.body.propertyID,
      physicalSurveyNo: req.body.physicalSurveyNo,
      tokenID: req.body.tokenID,
      Area: req.body.Area,
      City: req.body.City,
      ownerAddress: req.body.ownerAddress,
      Buyer_name: req.body.Buyer_name,
      InspectorName: req.body.InspectorName,
      Buyer_address: req.body.Buyer_address,
      Document_Access: req.body.Document_Access,
      ProcessStatus: req.body.ProcessStatus,
      Price: req.body.Price,
      ImageURL: req.body.ImageURL,
      DocumentURL: req.body.DocumentURL,
      PaymentStatus: req.body.PaymentStatus,
      TransactionHash: req.body.TransactionHash,
      OwnerAdhar: req.body.OwnerAdhar,
      OwnerContact: req.body.OwnerContact,
      BuyerTokenstatus: req.body.BuyerTokenstatus,
      StampDutyTokenStatus: req.body.StampDutyTokenStatus,
      PaymentDuration: req.body.PaymentDuration,
    };

    const details = new SellingLand(land_details);
    await details.save();
    res.status(200).send({ message: "Land Details saved successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

// PATCH request to update land details by propertyID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;
    const updatedSellingLand = await SellingLand.findOneAndUpdate(
      { propertyID: id },
      updateFields,
      { new: true } // Returns the updated document
    );

    if (!updatedSellingLand) {
      return res.status(404).send({ message: "Land details not found" });
    }

    res.status(200).send({ message: "Land details updated successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

module.exports = router;
