import { User } from '@entities/User'

export interface IUsersRepository {
  list(): Promise<User[]>;
  findById(public_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(public_id: string, user: User): Promise<User>;
  save(user: User): Promise<User>;
  deleteById(public_id: string): Promise<void>;
}
