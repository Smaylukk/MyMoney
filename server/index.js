const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');


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
    await sequelize.sync({ force:false });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
  } catch (error) {
    console.log('start - ',error);
  }
}

start();