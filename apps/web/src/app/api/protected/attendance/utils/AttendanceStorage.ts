'use client'

import { IndexedDBController, isServerSide } from '@custompackages/shared'

import { Attendance } from '@/server/repository'

export interface AttendanceParams {
  year: number
  month: number
  day: number
  offset: number
  userId: string

  data?: any
}

type DataAttribute = {
  now: number
}

export const AttendanceController = (!isServerSide() &&
  new IndexedDBController('pokitoki-storage-attendance', 1)) as IndexedDBController

export const getAttendanceByUserId = async ({ userId, year, day, month, offset }: AttendanceParams) => {
  return AttendanceController.read({
    id: `${userId}-${offset}-${year}-${month}-${day}`,
  }) as Promise<DataAttribute>
}

export const updateAttendanceByUserId = async ({ userId, year, day, month, offset, data }: AttendanceParams) => {
  AttendanceController.put({
    id: `${userId}-${offset}-${year}-${month}-${day}`,
    timestamp: Date.now(),
    data,
  })
}

export const DeleteAttendanceByUserId = async ({ userId, year, day, month, offset }: AttendanceParams) => {
  return AttendanceController.delete({
    id: `${userId}-${offset}-${year}-${month}-${day}`,
  }) as Promise<DataAttribute>
}
