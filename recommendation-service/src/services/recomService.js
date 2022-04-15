const axios = require("axios")
require("dotenv").config()
const URL_API =
  "https://recom.fpt.vn/api/v0.1/recommendation/api/result/getResult/"
const FPT_ID = process.env.FPT_ID
const API_FPT_KEY = process.env.API_FPT_KEY
// let productId = "621b15725acef22324f80272"

const getIdsOfRecommendedProducts = async (productId) => {
  let url = `${URL_API}${FPT_ID}?input=${productId}&key=${API_FPT_KEY}`
  try {
    let response = await axios.get(url)
    if (response && response.status === 200) {
      let listId = await formatListId(response.data.data)
      return listId
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}

const formatListId = (arrId) => {
  let arrFormatId = []
  if (arrId) {
    for (let i = 0; i < arrId.length; ++i) {
      let formatId = arrId[i]
      if (arrId[i].includes("{")) {
        formatId = arrId[i].replace("{", "")
      } else if (arrId[i].includes("}")) {
        formatId = arrId[i].replace("}", "")
      }
      arrFormatId.push(formatId)
    }
    return arrFormatId
  } else {
    return null
  }
}

module.exports = { getIdsOfRecommendedProducts }
