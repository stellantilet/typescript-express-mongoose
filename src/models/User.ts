import { model, Schema } from 'mongoose'
import { Receipt } from './Receipt'

export interface User {
  name: string
  username: string
  email: string
  balance: number
  isMember: boolean
  receipts?: Receipt[]
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  balance: {
    type: Number,
    default: 10000000,
  },
  isMember: {
    type: Number,
    default: true,
  },
  receipts: [{ type: Schema.Types.ObjectId, ref: 'Receipt' }],
})

const UserModel = model<User>('User', userSchema)

export default UserModel
