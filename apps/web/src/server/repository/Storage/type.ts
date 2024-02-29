export interface fileOptions {
  upsert?: boolean
  contentType?: string
}
export interface FileStorage {
  getFile(path: string): Promise<Blob | null>
  postFile(path: string, file: File): Promise<void>

  putFile(path: string, file: File): Promise<void>

  removeFile: (path: string | string[]) => Promise<void>
}
