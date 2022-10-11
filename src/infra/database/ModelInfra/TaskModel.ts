import { Model } from '@infra/database/knex'

class TaskModel extends Model {
  id: number
  public_id: string
  user_id: number
  summary: string
  active: boolean

  static get tableName () {
    return 'tasks'
  }
}

export { TaskModel }
