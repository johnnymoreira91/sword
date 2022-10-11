import { Model } from '@infra/database/knex'

class UserModel extends Model {
  id: number
  name: string
  email: string
  password: string
  age: number
  public_id: string
  active: boolean
  permission: number

  static get tableName () {
    return 'users'
  }
}

export { UserModel }
