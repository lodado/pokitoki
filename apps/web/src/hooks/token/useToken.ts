import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getUserToken } from '@/app/api/protected/token/api'

const useToken = () => {
  const query = useQuery({
    initialData: { token: 0 },
    queryKey: ['userToken'],
    queryFn: getUserToken,
    refetchInterval: 30000,
  })

  return query
}

export default useToken
