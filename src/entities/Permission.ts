class Permission {
  public readonly id?: number

  public name: string
  public level: number

  constructor (props: Omit<Permission, 'id'>) {
    Object.assign(this, props)
  }
}

export { Permission }
