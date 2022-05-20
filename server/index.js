const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const startService = require('./services/startService');


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api', router)

//Обробник помилок має бути останнім в ланцюжку мідлвейр
app.use(errorMiddleware)

app.get('/', (req, res) => res.send('Hello World!'))

const start = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ force:false })
      .then((data) => {
        startService.initTable()
      })
      .catch(reason => {throw new Error(JSON.stringify(reason))})

    app.listen(
      port, 
      () => console.log(`Server start on port ${port}!`)) 
  } catch (error) {
    console.log('start error - ',error);
  }
}

start();