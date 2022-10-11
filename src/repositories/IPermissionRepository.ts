import { Permission } from '@entities/Permission'

export interface IPermissionRepository {
  findByName(permission_name: string): Promise<Permission>;
  findByLevel(permission_level: number): Promise<Permission>;
}
