const express = require("express");
const router = express.Router();

const { UserRepository } = require("../../database/Repository/users");
const { AddressRepository } = require("../../database/Repository/address");
const userRepo = new UserRepository();
const addressRepo = new AddressRepository();

const { AddressService } = require("../../services/address");
const addressService = new AddressService(addressRepo, userRepo);

router.post("/create", async (req, res) => {
  try {
    const { uid, address, city, state, phoneNumbers } = req.body;
    const data = await addressService.AddAddress({
      uid,
      address,
      city,
      state,
      phoneNumbers,
    });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling Add User Address", e);
    return res.status(401).json({ success: false, error: e });
  }
});

module.exports = router;
