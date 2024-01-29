'use client'

import { useStore } from 'jotai'
import React from 'react'

import { RepositoriesAggregate, ServiceInterface } from '../domain/adapter'

const useService = <REPOS extends RepositoriesAggregate, SERVICE extends ServiceInterface>(Service: SERVICE) => {
  const service = React.useRef(Service).current

  const useServiceStates = service.useStates

  const componentId = React.useId()
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const [subscribeId, updateSubscribeId] = React.useReducer((x) => x + 1, 0)

  const notify = () => {
    updateSubscribeId()
  }

  const updateRepository = (Repository: REPOS) => {
    service.updateRepositories(Repository)

    notify()
  }

  React.useEffect(() => {
    const unsub = service.subScribes(forceUpdate)

    return unsub
  }, [subscribeId])

  return {
    service,
    useServiceStates,
    updateRepository,
  }
}

export default useService
