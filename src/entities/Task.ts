import { v4 as uuidv4 } from 'uuid'

class Task {
  public readonly id?: number
  public readonly public_id?: string

  public user_id: number
  public summary: string
  public active: boolean
  public completed_at?: Date
  public created_at: Date
  public updated_at: Date

  constructor (props: Omit<Task, 'id' | 'public_id'>, public_id?: string) {
    this.public_id = public_id || uuidv4()
    Object.assign(this, props)
  }
}

export { Task }
