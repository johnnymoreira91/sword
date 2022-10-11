import { database } from '../knex'
import { UserModel } from '../ModelInfra/User'

async function createUsers (): Promise<boolean> {
  try {
    await database.transaction(async trx => {
      await UserModel.query(trx).insert({
        name: 'test',
        email: 'test@test.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 22,
        active: true,
        permission: 1,
        public_id: 'user-9989'
      })
      await UserModel.query(trx).insert({
        name: 'technician one',
        email: 'technician1@technician.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 33,
        active: true,
        permission: 1,
        public_id: 'user-9990'
      })
      await UserModel.query(trx).insert({
        name: 'technician two',
        email: 'technician2@technician.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 28,
        active: true,
        permission: 1,
        public_id: 'user-9991'
      })

      await UserModel.query(trx).insert({
        name: 'technician three',
        email: 'technician3@technician.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 52,
        active: true,
        permission: 1,
        public_id: 'user-9992'
      })
      await UserModel.query(trx).insert({
        name: 'manager',
        email: 'manager@manager.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 52,
        active: true,
        permission: 2,
        public_id: 'user-9993'
      })
      await UserModel.query(trx).insert({
        name: 'super',
        email: 'super@super.com',
        password: '$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6',
        age: 44,
        active: true,
        permission: 2,
        public_id: 'user-9994'
      })
    })
    return true
  } catch (error) {
    return false
  }
}

export { createUsers }
