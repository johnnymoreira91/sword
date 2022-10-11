import { TaskModel } from '@infra/database/ModelInfra/TaskModel'

async function TaskMock () {
  await TaskModel.query().insert({
    user_id: 1,
    summary: 'Clear my computer',
    public_id: 'my-task-001',
    active: true
  })
  await TaskModel.query().insert({
    user_id: 1,
    summary: 'format managers computer',
    public_id: 'my-task-002',
    active: true
  })
  await TaskModel.query().insert({
    user_id: 2,
    summary: 'Clear my computer',
    public_id: 'my-task-003',
    active: true
  })
  await TaskModel.query().insert({
    user_id: 2,
    summary: 'Clear HR computer',
    public_id: 'my-task-004',
    active: true
  })
}

export { TaskMock }
