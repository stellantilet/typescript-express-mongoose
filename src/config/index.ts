import dotenv from 'dotenv'
dotenv.config()
const Config = {
  MongoDB: process.env.MONGO_DB,
}

export default Config
