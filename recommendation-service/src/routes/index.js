const express = require("express");
const { getRecommendedProductsById } = require("../controllers/recom");

const router = express.Router();

router.post("/recom/getRecommendedProductsById", getRecommendedProductsById);

module.exports = router;

