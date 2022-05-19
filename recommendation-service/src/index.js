const express = require('express')
const env = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const routes = require('./routes')

env.config()

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dpsol.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log(err)
    })
    
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./models')
app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})