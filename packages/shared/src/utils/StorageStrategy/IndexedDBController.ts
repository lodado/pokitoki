import { isServerSide } from '../isServerSide'

export interface DataWithTimestamp {
  id: string
  timestamp: number
  [key: string]: any // Allows any other property with a key of type string and value of any type
}

export default class IndexedDBController {
  private dbName: string
  private version: number
  private db: IDBDatabase | null
  private indexedDBKey: string

  constructor(dbName: string, version: number) {
    this.dbName = dbName
    this.version = version
    this.db = null
    this.indexedDBKey = 'IndexedDBController'
  }

  async open(): Promise<void> {
    if (this.db || isServerSide())
      return new Promise((resolve, reject) => {
        resolve()
      })

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(this.indexedDBKey)) {
          db.createObjectStore(this.indexedDBKey, { keyPath: 'id' })
        }
      }

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result

        resolve()
      }

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  async put(data: DataWithTimestamp): Promise<void> {
    if (!this.db) {
      await this.open()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey], 'readwrite')
      const store = transaction.objectStore(this.indexedDBKey)
      const request = store.put(data)

      request.onsuccess = () => {
        resolve()
      }
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
    })
  }

  async read({ id }: { id: string }): Promise<DataWithTimestamp | undefined> {
    if (!this.db) {
      await this.open()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey])
      const store = transaction.objectStore(this.indexedDBKey)
      const request = store.get(id)

      request.onsuccess = async () => {
        const data = request.result as DataWithTimestamp
        resolve(data)
      }
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
    })
  }

  async delete({ id }: { id: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey], 'readwrite')
      const store = transaction.objectStore(this.indexedDBKey)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
    })
  }
}
