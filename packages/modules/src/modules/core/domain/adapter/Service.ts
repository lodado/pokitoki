import { Repository } from '../domain'

// Define a type for an aggregate of repositories

export type RepositoriesAggregate = Record<string, Repository>

export abstract class ServiceInterface<REPOS extends RepositoriesAggregate = RepositoriesAggregate> {
  protected repositories: REPOS = undefined!

  constructor(repositories: REPOS) {
    this.updateRepositories(repositories)
  }

  updateRepositories(newRepositories: Partial<REPOS>) {
    this.repositories = { ...this.repositories, ...newRepositories }
  }
  useStates = () => {
    return Object.entries(this.repositories).reduce((total: RepositoriesAggregate, [key, repository]) => {
      // eslint-disable-next-line no-param-reassign
      total[key.replace(/Repository/, '')] = repository.useStates()

      return total
    }, {}) as any
  }

  subScribes(reRender: Function) {
    const unSubscribes: (() => void)[] = []

    Object.values(this.repositories).forEach((repository) => {
      unSubscribes.push(repository.subscribe(reRender))
    })

    return () => {
      unSubscribes.forEach((unSubscribe) => unSubscribe())
    }
  }
}
