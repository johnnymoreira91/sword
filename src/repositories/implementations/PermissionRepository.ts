import { Permission } from '@entities/Permission'
import { PermissionModel } from '@infra/database/ModelInfra/Permission'
import { IPermissionRepository } from '@repositories/IPermissionRepository'

class PermissionRepository implements IPermissionRepository {
  async findByName (permission_name: string): Promise<Permission> {
    return PermissionModel.query().where('name', permission_name).first()
  }

  async findByLevel (permission_level: number): Promise<Permission> {
    return PermissionModel.query().where('level', permission_level).first()
  }
}

export { PermissionRepository }
