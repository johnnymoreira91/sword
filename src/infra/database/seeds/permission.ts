import { database } from '../knex'
import { PermissionModel } from '../ModelInfra/Permission'

async function createPermissions (): Promise<boolean> {
  try {
    await database.transaction(async trx => {
      await PermissionModel.query(trx).insert({
        name: 'Technician',
        level: 1
      })
      await PermissionModel.query(trx).insert({
        name: 'Manager',
        level: 2
      })
    })
    return true
  } catch (error) {
    return false
  }
}

export { createPermissions }
