import { loadImage } from '@/features/userHub/ui/create/lib/loadImages'
import { Canvas, FabricImage, filters } from 'fabric'

type Params = {
  fabricCanvas: Canvas | null
  imgSrc: string
  filterName: string
  quality: number
  multiplier: number
}

export const getFilteredThumbnail = async ({
  fabricCanvas,
  imgSrc,
  filterName,
  quality,
  multiplier,
}: Params): Promise<string | null> => {
  if (!fabricCanvas || !imgSrc) return null

  try {
    const img = await loadImage(imgSrc)
    // Полностью очищаем холст
    fabricCanvas.clear()
    // Устанавливаем размер холста
    fabricCanvas.setDimensions({
      width: img.width,
      height: img.height,
    })

    const fabricImage = new FabricImage(img)

    // Очищаем фильтры
    fabricImage.filters = []
    // Применяем выбранный фильтр
    switch (filterName) {
      case 'grayscale':
        fabricImage.filters.push(new filters.Grayscale())
        break
      case 'sepia':
        fabricImage.filters.push(new filters.Sepia())
        break
      case 'vintage':
        fabricImage.filters.push(new filters.Vintage())
        break
      case 'polaroid':
        fabricImage.filters.push(new filters.Polaroid())
        break
      case 'blackwhite':
        fabricImage.filters.push(new filters.BlackWhite())
        break
      case 'brightness':
        fabricImage.filters.push(new filters.Brightness({ brightness: 0.2 }))
        break
      case 'contrast':
        fabricImage.filters.push(new filters.Contrast({ contrast: 0.3 }))
        break
      case 'saturation':
        fabricImage.filters.push(new filters.Saturation({ saturation: 0.5 }))
        break
      default:
        break
    }
    // Применяем фильтры к изображению
    fabricImage.applyFilters()
    fabricCanvas.add(fabricImage)

    // Генерация URL с указанным качеством и размером
    return fabricCanvas.toDataURL({
      format: 'jpeg',
      quality, //качество для миниатюры(картинки)
      multiplier, //  размер миниатюры(картинки)
    })
  } catch (error) {
    console.error('Error generating filtered thumbnail:', error)
    return null
  }
}
