import { openDB } from "idb";

const DB_NAME = "imagesDatabase";
const STORE_NAME = "images";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "uploadId",
          autoIncrement: true,
        });
      }
    },
  });
};

type UpdateImageById = {
  uploadId: string;
  url: Blob;
};

type Image = { uploadId: string; url: File | Blob };

export const indexDBUtils = {
  async saveImage(image: Image) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite"); //добавить элемент в хранилище, вот так: readwrite
    await tx.store.put(image);
    await tx.done;
  },

  async getImages() {
    const db = await initDB();
    return db.getAll(STORE_NAME);
  },

  async getImageById(
    uploadId: string,
  ): Promise<{ uploadId: string; url: Blob }> {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const result = await tx.store.get(uploadId);

    if (!result) {
      throw new Error(`Image with ID ${uploadId} not found in IndexedDB`);
    }
    return result;
  },

  async clearAllImages() {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.store.clear();
    await tx.done;
  },

  async deleteImageById(uploadId: string) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.store.delete(uploadId);
    await tx.done;
  },
  async updateImageById({ uploadId, url }: UpdateImageById) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    // Обновляем изображение по id
    await tx.store.put({ uploadId, url });
    await tx.done;
  },
};
