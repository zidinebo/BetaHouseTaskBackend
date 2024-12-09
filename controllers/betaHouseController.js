const betaHouse = require("../models/betahouses");

// ========== CONTROLLER TO FIND ALL HOUSES =========
const allHouses = async (req, res) => {
  const houses = await betaHouse.find({});
  res.status(200).json({ houses });
};

// =========== CONTROLLER TO FIND ONLY HOUSES FOR RENTS ========
const allRents = async (req, res) => {
  const rents = await betaHouse.find({ tag: "For Rent" });
  res.status(200).json({ houses: rents });
};

// ============ CONTROLLER TO FIND ONLY HOUSES FOR SALES ========
const allSales = async (req, res) => {
  const sales = await betaHouse.find({ tag: "For Sale" });
  res.status(200).json({ houses: sales });
};

module.exports = { allHouses, allRents, allSales };
