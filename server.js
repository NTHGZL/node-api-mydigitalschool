require('dotenv').config()
const express = require('express')
const Logger = require('./tools/logger')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
var router = express.Router();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(Logger);

app.use(router);

app.use('/', require('./routes'))
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

