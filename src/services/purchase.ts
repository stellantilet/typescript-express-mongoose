import ProductModel from '../models/Product'
import ReceiptModel from '../models/Receipt'
import UserModel from '../models/User'

export class PurchaseError extends Error {}

export class PurchaseService {
  static async purchaseProduct(
    username: string,
    productId: string,
    quantity: number,
  ) {
    const user = await UserModel.findOne({ username })
    if (!user) {
      throw new PurchaseError('User not exists')
    }

    const product = await ProductModel.findOne({ _id: productId })
    if (!product) {
      throw new PurchaseError('Product not exists')
    }

    if (quantity > product.quantity) {
      throw new PurchaseError(
        `You cannot purchase more than ${product.quantity}`,
      )
    }

    const amount = quantity * product.price
    if (user.balance < amount) {
      throw new PurchaseError('Out of balance to purchase')
    }

    const receipt = await ReceiptModel.create({
      user: user._id,
      product: product._id,
      price: product.price,
      quantity: quantity,
      amount,
    })
    product.quantity -= quantity
    await product.save()

    user.receipts.push(receipt)
    user.balance -= amount
    await user.save()

    return user
  }
}
