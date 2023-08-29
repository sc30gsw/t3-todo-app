import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import Layout from '../../components/Layout'
import { api } from '../../utils/api'

const SingleTaskPage = () => {
  const router = useRouter()
  const taskId = router.query.taskId as string
  const { data, isLoading, error } = api.todo.getSingleTask.useQuery({
    taskId,
  })
  if (isLoading) return <p>Loading task list...</p>

  if (error) return <p>{error.message}</p>

  return (
    <Layout title="Task Detail">
      <p className="mb-3 text-xl font-bold text-blue-600">{data?.title}</p>
      <p>{data?.body}</p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.createdAt), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <Link href="/">
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
      </Link>
    </Layout>
  )
}

export default SingleTaskPage
