'use client'

import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'

import { messageControllerAtom } from '@/store/message'

const useMessageStorage = () => {
  const messageController = useAtomValue(messageControllerAtom)

  useEffect(() => {
    messageController.open()
  }, [])

  return {}
}

export default useMessageStorage
