import { Model } from '@infra/database/knex'

class PermissionModel extends Model {
  id: number
  name: string
  level: number

  static get tableName () {
    return 'permissions'
  }
}

export { PermissionModel }
