import z from 'zod'

// 登録用バリデーションスキーマ
export const createTaskSchema = z.object({
  title: z.string().max(20),
  body: z.string().min(5),
})

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>

// 更新用バリデーションスキーマ
export const updateTaskSchema = z.object({
  taskId: z.string().cuid(),
  title: z.string().max(20),
  body: z.string().min(5),
})

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>

// タスク取得用バリデーションスキーマ
export const getSingleTaskSchema = z.object({
  taskId: z.string().cuid(),
})

// タスク削除用バリデーションスキーマ
export const deleteTaskSchema = z.object({
  taskId: z.string().cuid(),
})
