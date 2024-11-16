import { useAppDispatch } from '@/appRoot/lib/hooks/hooksStore'
import { indexDBUtils } from '@/common/utils'
import { setImages } from '@/features/userHub/model/createSlice'

export const loadImages = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  try {
    const savedImages = await indexDBUtils.getImages()
    const formattedImages = savedImages.map(im => ({
      id: im.id,
      image: URL.createObjectURL(im.image),
    }))
    dispatch(setImages(formattedImages))
  } catch (err) {
    console.error('Failed to load images from IndexedDB:', err)
  }
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = src
    img.crossOrigin = 'Anonymous'
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
  })
}
