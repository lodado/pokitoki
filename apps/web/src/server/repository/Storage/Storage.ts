import { supabaseInstance } from '../supabase'
import { fileOptions, FileStorage } from './type'

/**
 * The SupabaseStorage class manages files using Supabase's storage capabilities.
 */
class SupabaseStorage implements FileStorage {
  key: string

  storage: typeof supabaseInstance.storage

  /**
   * Constructor for the SupabaseStorage class.
   * @param {string} key - The name of the storage bucket. Defaults to 'pokitokiStorage'.
   */
  constructor(key = 'pokitokiStorage') {
    this.key = key
    this.storage = supabaseInstance.storage
  }

  /**
   * Retrieves a file from the specified path.
   * @param {string} path - The path of the file to retrieve.
   * @returns {Promise<Blob | null>} A Blob containing the file data, or null if an error occurred.
   */
  getFile = async (path: string) => {
    const { data, error } = await this.storage.from(this.key).download(path)

    return data
  }

  /**
   * Uploads a file to the specified path.
   * @param {string} path - The path where the file will be uploaded.
   * @param {File} file - The file object to upload.
   * @param {fileOptions} options - Upload options. Defaults to an empty object.
   */
  postFile = async (path: string, file: File, options: fileOptions = {}) => {
    const { data, error } = await this.storage.from(this.key).upload(path, file, options)
    if (error) {
      // Handle error
    } else {
      // Handle success
    }
  }

  /**
   * Updates a file at the specified path, or uploads it if it does not exist.
   * @param {string} path - The path where the file will be uploaded or updated.
   * @param {File} file - The file object to upload.
   * @param {fileOptions} options - Upload options. Defaults to an empty object but sets upsert to true by default.
   */
  putFile = async (path: string, file: File, options: fileOptions = {}) => {
    this.postFile(path, file, {
      upsert: true,
      ...options,
    })
  }

  /**
   * Removes a file or files at the specified path(s).
   * @param {string | string[]} path - The path(s) of the file(s) to remove. Can be a single string or an array of strings.
   */
  removeFile = async (path: string | string[]) => {
    const PathArray = Array.isArray(path) ? path : [path]

    this.storage.from(this.key).remove(PathArray)
  }
}

const SupabaseStorageInstance = new SupabaseStorage()

export default SupabaseStorageInstance
