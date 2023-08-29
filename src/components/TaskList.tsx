import React from 'react'

import { api } from '../utils/api'
import TaskItem from './TaskItem'

const TaskList = () => {
  const { data, isLoading, error } = api.todo.getTasks.useQuery()

  if (isLoading) return <p>Loading task list...</p>

  if (error) return <p>{error.message}</p>

  return (
    <ul>
      {data?.map((task) => (
        <TaskItem
          key={task.id}
          taskId={task.id}
          title={task.title}
          body={task.body}
        />
      ))}
    </ul>
  )
}

export default TaskList
