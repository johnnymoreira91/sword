import { User } from '@entities/User'
import { createSchema } from '@infra/database/createTables'
import { PermissionModel } from '@infra/database/ModelInfra/Permission'
import { UserModel } from '@infra/database/ModelInfra/User'
import { database } from '@infra/database/knex'
import { TaskMock } from './taskMock'

const userNormal: User = {
  public_id: 'user-0001',
  name: 'normal',
  email: 'normal@normal.com',
  password: 'normal',
  age: 49,
  active: true,
  permission: 1
}

const technicianOne: User = {
  public_id: 'user-0002',
  name: 'technician',
  email: 'technician@technician.com',
  password: 'technician',
  age: 49,
  active: true,
  permission: 1
}

const technicianTwo: User = {
  public_id: 'user-0003',
  name: 'technician2',
  email: 'technician2@technician.com',
  password: 'technician',
  age: 49,
  active: true,
  permission: 1
}

async function InsertMock () {
  await database.schema.dropSchema
  await createSchema()
  PermissionModel.query().insert({
    name: 'technician',
    level: 1
  })
  PermissionModel.query().insert({
    name: 'manager',
    level: 2
  })

  UserModel.query().insert({ ...userNormal })
  UserModel.query().insert({ ...technicianOne })
  UserModel.query().insert({ ...technicianTwo })
  await TaskMock()
}

export { InsertMock }
