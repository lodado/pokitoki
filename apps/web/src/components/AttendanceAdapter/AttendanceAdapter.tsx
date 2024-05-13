'use client'

import React, { useEffect } from 'react'

import { putAttendance } from '@/app/api/protected/attendance/api'

const AttendanceAdapter = () => {
  useEffect(() => {
    putAttendance()
  }, [])

  return <></>
}

export default AttendanceAdapter
