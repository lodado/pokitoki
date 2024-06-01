import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getUserToken } from '@/app/api/protected/token/api'

const useToken = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['userToken'],
    queryFn: getUserToken,
    refetchInterval: 30000,
  })

  return data
}

export default useToken
