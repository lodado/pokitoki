'use client'

import { IndexedDBController, isServerSide } from '@custompackages/shared'

export interface AttendanceParams {
  year: number
  month: number

  day: number
  userId: string
}

export const messageController = (!isServerSide() &&
  new IndexedDBController('pokitoki-storage', 1)) as IndexedDBController

export const getAttendanceByUserId = async <T>({ userId, year, day, month }: AttendanceParams) => {
  return messageController.read({
    id: `${userId}-${year}-${month}-${day}`,
  }) as T
}

export const updateAttendanceByUserId = async ({ userId, year, day, month }: AttendanceParams) => {
  messageController.put({
    id: `${userId}-${year}-${month}-${day}`,
    timestamp: Date.now(),
    data: true,
  })
}

export const DeleteAttendanceByUserId = async <T>({ userId, year, day, month }: AttendanceParams) => {
  return messageController.delete({
    id: `${userId}-${year}-${month}-${day}`,
  }) as T
}
