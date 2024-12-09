const express = require("express");
const {
  allHouses,
  allRents,
  allSales,
} = require("../controllers/betaHouseController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/").get(allHouses).all(methodNotAllowed);

router.route("/rents").get(allRents).all(methodNotAllowed);

router.route("/sales").get(allSales).all(methodNotAllowed);

module.exports = router;
