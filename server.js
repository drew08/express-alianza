require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
db.on('connected', () => console.log('Connected to database'));

app.use(express.json())


const clientsRouter = require('./routes/clients.js')
app.use('/clients', clientsRouter)

app.listen(3000, () => console.log('Server Started'))