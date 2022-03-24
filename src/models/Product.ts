import { model, Schema } from 'mongoose'

export interface Product {
  name: string
  price: number
  quantity: number
}

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 5000,
  },
})

const ProductModel = model<Product>('Product', productSchema)

export default ProductModel
