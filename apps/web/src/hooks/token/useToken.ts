import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getUserToken } from '@/app/api/protected/token/api'

// 잠깐 build오류나서 any추가
const useToken: any = () => {
  const { data, refetch } = useQuery({
    initialData: { token: 0 },
    queryKey: ['userToken'],
    queryFn: getUserToken,
    refetchInterval: 30000,
  })

  return { data, refetch }
}

export default useToken
