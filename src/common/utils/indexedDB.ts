import { openDB } from 'idb'

const DB_NAME = 'imagesDatabase'
const STORE_NAME = 'images'

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

type UpdateImageById = {
  id: string
  updatedImage: Blob
}

type Image = { id: string; image: File | Blob }

export const indexDBUtils = {
  async saveImage(image: Image) {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readwrite') //добавить элемент в хранилище, вот так: readwrite
    await tx.store.put(image)
    await tx.done
  },

  async getImages() {
    const db = await initDB()
    return db.getAll(STORE_NAME)
  },

  async getImageById(id: string): Promise<{ id: string; image: Blob }> {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const result = await tx.store.get(id)

    if (!result) {
      throw new Error(`Image with ID ${id} not found in IndexedDB`)
    }
    return { id, image: result.image }
  },
  async clearAllImages() {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    await tx.store.clear()
    await tx.done
  },

  async deleteImageById(id: string) {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    await tx.store.delete(id)
    await tx.done
  },
  async updateImageById({ id, updatedImage }: UpdateImageById) {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    // Обновляем изображение по id
    await tx.store.put({ id, image: updatedImage })
    await tx.done
  },
}
