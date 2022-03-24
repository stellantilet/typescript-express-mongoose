import { dummyProducts } from '../dummy/products'
import ProductModel from '../models/Product'

export class ProductService {
  static async createDummyProducts() {
    await Promise.all(
      dummyProducts.map(async (dummyProduct) => {
        try {
          return await ProductModel.create(dummyProduct)
        } catch (e) {}
      }),
    )
  }

  static async getProducts() {
    const products = await ProductModel.find({})
    return products
  }

  static async getProduct(_id: string) {
    const product = await ProductModel.findOne({ _id })
    return product
  }
}
