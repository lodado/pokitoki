interface DataWithExpiration {
  id: string
  expiresTime: number
  [key: string]: any // Allows any other property with a key of type string and value of any type
}

class IndexedDBController {
  private dbName: string
  private version: number
  private db: IDBDatabase | null
  private indexedDBKey: string

  constructor(dbName: string, version: number) {
    this.dbName = dbName
    this.version = version
    this.db = null
    this.indexedDBKey = 'pokitoki-storage'
  }

  async open(): Promise<void> {
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

  async addData(data: DataWithExpiration): Promise<void> {
    if (!this.db) {
      await this.open()
    }

    // const expiresIn = 730 * 24 * 60 * 60 * 1000
    // const expiresTime = Date.now() + expiresIn

    // const newData = { ...data, expiresTime }

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

  async deleteData(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey], 'readwrite')
      const store = transaction.objectStore(this.indexedDBKey)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
    })
  }

  async getData(key: string): Promise<DataWithExpiration | undefined> {
    if (!this.db) {
      await this.open()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey])
      const store = transaction.objectStore(this.indexedDBKey)
      const request = store.get(key)

      request.onsuccess = async () => {
        const data = request.result as DataWithExpiration

        /*
        if (data && data.expiresTime < Date.now()) {
          await this.deleteData(key)
          resolve(undefined)
        } else {
          resolve(data)
        }
        */

        resolve(data)
      }
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
    })
  }
}

export default IndexedDBController
