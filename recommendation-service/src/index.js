const express = require("express")
const env = require("dotenv")
const app = express()
const cors = require("cors")
const routes = require("./routes")

env.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
