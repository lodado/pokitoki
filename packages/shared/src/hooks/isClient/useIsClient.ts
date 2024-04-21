import React, { useEffect, useState } from 'react'

export interface useIsClientParams {
  callback?: Function
}

const useIsClient = ({ callback }: useIsClientParams) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    callback?.()
  }, [])

  return isClient
}
export default useIsClient
