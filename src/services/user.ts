import { dummyUsers } from '../dummy/users'
import UserModel from '../models/User'

export class UserService {
  static async createDummyUsers() {
    await Promise.all(
      dummyUsers.map(async (dummyUser) => {
        try {
          return await UserModel.create(dummyUser)
        } catch (e) {}
      }),
    )
  }

  static async getUsers() {
    const users = await UserModel.find()
    return users
  }

  static async getUser(username: string) {
    const user = await UserModel.findOne({ username })
    return user
  }

  static async getUserDetail(username: string) {
    const user = await UserModel.findOne({ username }).populate({
      path: 'receipts',
      populate: { path: 'product' },
    })
    return user
  }
}
