import { User } from '@entities/User'
import { database } from '@infra/database/knex'
import { UserModel } from '@infra/database/ModelInfra/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  async list (): Promise<User[]> {
    return UserModel.query()
  }

  async findById (public_id: string): Promise<User> {
    return UserModel.query().where('public_id', public_id).first()
  }

  async findByEmail (email: string): Promise<User> {
    return UserModel.query().where('email', email).first()
  }

  async update (public_id: string, user: User): Promise<User> {
    await database.transaction(async trx => {
      const userData = await UserModel.query(trx).update({ ...user }).where('public_id', public_id).first()
      return userData
    })

    return user
  }

  async save (user: User): Promise<User> {
    return database.transaction(async trx => {
      return UserModel.query(trx).insert({ ...user })
    })
  }

  async deleteById (public_id: string): Promise<void> {
    const userData = await UserModel.query().where('public_id', public_id).first()
    await database.transaction(async trx => {
      await UserModel.query(trx).deleteById(userData.id)
    })
  }
}

export { UsersRepository }
