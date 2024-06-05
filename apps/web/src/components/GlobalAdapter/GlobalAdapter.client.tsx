'use client'

import React, { useEffect } from 'react'

import Tutorial from '@/components/GlobalAdapter/Tutorial/Tutorial'

import useGlobalAttendance from './useGlobalAttendance'

const GlobalAdapterClient = () => {
  useGlobalAttendance()

  return (
    <>
      <Tutorial />
    </>
  )
}

export default GlobalAdapterClient
