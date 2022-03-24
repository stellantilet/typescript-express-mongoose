import { ConnectionOptions, connect } from 'mongoose'
import Config from './config'
import { ProductService } from './services/product'
import { UserService } from './services/user'

const initializeDB = async () => {
  try {
    const mongoURI: string = Config.MongoDB
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
    await connect(mongoURI, options)

    UserService.createDummyUsers()
    ProductService.createDummyProducts()

  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

export default initializeDB
