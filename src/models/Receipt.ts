import { model, now, Schema } from 'mongoose'
import { Product } from './Product'
import { User } from './User'

export interface Receipt {
  user: User
  product: Product
  name: string
  price: number
  quantity: number
}

const receiptSchema = new Schema<Receipt>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

const ReceiptModel = model<Receipt>('Receipt', receiptSchema)

export default ReceiptModel
