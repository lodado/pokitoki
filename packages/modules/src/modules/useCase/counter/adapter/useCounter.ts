import React from 'react'

import { useService } from '../../../core'
import CounterService from '../application/counter.service'
import CounterRepository from '../domain/counter.repository'

const counterServiceInstance = new CounterService({ counterRepository: new CounterRepository() })

export default function useCounter() {
  const serviceContainer = useService(counterServiceInstance)
  const { service: counterService, useServiceStates } = serviceContainer

  const { counter: count } = useServiceStates()

  const increment = async (by: number) => {
    counterService.increment(by)
  }

  const decrement = async (by: number) => {
    counterService.decrement(by)
  }

  const updateRepository = () => {
    serviceContainer.updateRepository({ counterRepository: new CounterRepository() })
  }

  return {
    count,
    increment,
    decrement,
    updateRepository,
  }
}
