const {
  searchProducts,
  getFilters,
} = require("../Controllers/searchController.js");

const router = require("express").Router();

router.get("/products", searchProducts);
router.get("/filters", getFilters);

module.exports = router;
