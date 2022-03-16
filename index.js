//* config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//* forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//* Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//* rota inicial / endpoint
app.get('/', (req, res) => {
    //* mostrar req

    res.json({ message: "Oi Express!" })
})

//* entregar uma porta
const DB_NAME = process.env.DB_NAME;
const DB_SERVER = process.env.DB_SERVER;

mongoose
    .connect(
        `mongodb://${DB_SERVER}/${DB_NAME}`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
