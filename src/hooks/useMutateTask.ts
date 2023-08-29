import React from 'react'

import useStore from '../store'
import { api } from '../utils/api'

const useMutateTask = () => {
  const utils = api.useContext()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = api.todo.createTask.useMutation({
    onSuccess: (res) => {
      const previousTasks = utils.todo.getTasks.getData()
      if (previousTasks) {
        utils.todo.getTasks.setData(undefined, [res, ...previousTasks])
      }

      reset()
    },
  })

  const updateTaskMutation = api.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTasks = utils.todo.getTasks.getData()
      if (previousTasks) {
        utils.todo.getTasks.setData(
          undefined,
          previousTasks.map((task) => (task.id === res.id ? res : task)),
        )
      }

      reset()
    },
  })

  const deleteTaskMutation = api.todo.deleteTask.useMutation({
    // 第一引数にAPIの返り値・第二引数にAPIに渡された引数の値
    onSuccess: (_, variables) => {
      const previousTasks = utils.todo.getTasks.getData()
      if (previousTasks) {
        utils.todo.getTasks.setData(
          undefined,
          previousTasks.filter((task) => task.id !== variables.taskId),
        )
      }

      reset()
    },
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}

export default useMutateTask
