const { getIdsOfRecommendedProducts } = require("../services/recomService.js")
const axios = require('axios')

exports.getRecommendedProductsById = async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400).json({ error: "Id is required" })
  }
  try {
    const ids = await getIdsOfRecommendedProducts(id)
    let urlProductService = `http://${process.env.PRODUCT_SERVICE_HOST}/api/product/getListProductByIds`
    let finalResponse = await axios.post(urlProductService, { ids })
    if (finalResponse) {
      res.status(200).json({ products: finalResponse.data.products })
    } else {
      res.status(400).json({ error: "Something went wrong" })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}
