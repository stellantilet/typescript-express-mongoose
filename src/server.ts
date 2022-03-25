import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import initializeDB from './database'
import products from './routes/products'
import purchase from './routes/purchase'
import users from './routes/users'

const app = express()

// Connect to MongoDB
initializeDB()

// Express configuration
app.use(cors())
app.set('port', process.env.PORT || 80)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('API Running')
})

app.use('/purchase', purchase)
app.use('/users', users)
app.use('/products', products)

const port = app.get('port')
const server = app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}/`),
)

export default server
