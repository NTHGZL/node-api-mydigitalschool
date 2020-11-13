require('dotenv').config()
const express = require('express')
const Logger = require('./tools/logger')
const bodyParser = require('body-parser')

//connecteur à la bdd MongoDB
const mongoose = require('mongoose')

const app = express()

//Réglage du port d'écoute
const port = process.env.PORT || 3000
var router = express.Router();

//Initialisation de la connexion à la BDD 
const mongoURL = process.env.MONGO_URL+'?retryWrites=true&w=majority'

//Initialisation des paramètres de la bdd
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

//Connexion à la bdd
mongoose.connect(mongoURL, dbOptions, error => {
  if(error){
    throw error
  }
})
//Passage en monde debug
mongoose.set('debug', true);

//Recup de l'objet db
const db = mongoose.connection;

//Listener d'erreur
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'))

//Listener d'information de connexion réussi
db.once('open', ()=>{
  console.info('Connexion à la base ok')
})

//Mise en place du body parser afin d'obtenir un objet req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(Logger);

app.use(router);

app.use('/', require('./routes'))
app.use('/notes', require('./routes/notes'))
app.use('/users', require('./routes/users'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

