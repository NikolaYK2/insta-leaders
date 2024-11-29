export const convertBlobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
  const response = await fetch(blobUrl) // Загружаем blob по URL
  const blob = await response.blob() // Преобразуем в Blob
  return new File([blob], fileName, { type: blob.type }) // Преобразуем в File
}
