import { Area } from 'react-easy-crop'

/**
 * получаем обрезанное изображение на основе указанных пикселей, используя библиотеку react-easy-crop.
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    // Создает новый HTML-элемент изображения.
    const image = new Image()
    // Когда изображение загружается успешно, промис завершается успешно, возвращая объект изображения.
    image.addEventListener('load', () => resolve(image))
    // Если изображение не загружается, промис отклоняется с ошибкой.
    image.addEventListener('error', error => reject(error))
    // Устанавливает источник изображения (URL), после чего изображение начинает загружаться.
    image.src = url
  })

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area | undefined
): Promise<Blob | undefined> => {
  // Загружает изображение из указанного URL с помощью функции `createImage`.
  const image = await createImage(imageSrc)
  // Создает элемент `canvas`, который используется для отображения обрезанного изображения.
  const canvas = document.createElement('canvas')
  // Получает контекст 2D, который позволяет рисовать на канвасе.
  const ctx = canvas.getContext('2d')

  if (pixelCrop) {
    // Устанавливает ширину и высоту канваса равной размерам области обрезки.
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
  }

  if (ctx && pixelCrop) {
    // Рисует выбранную область изображения (`pixelCrop`) на канвасе. Начальные координаты определяют область на изображении, которую нужно обрезать.
    ctx.drawImage(
      image, //image — Объект изображения, который нужно отобразить на канвасе. Это загруженное изображение, переданное функции для обрезки.
      pixelCrop.x, // — Координата x на исходном изображении, с которой начинается область обрезки. Она определяет, откуда по горизонтали начнется обрезка.
      pixelCrop.y, //  — Координата y на исходном изображении, с которой начинается область обрезки. Она указывает, откуда по вертикали начнется обрезка.
      pixelCrop.width, //  — Ширина области обрезки на исходном изображении. Определяет, сколько пикселей по горизонтали будет захвачено от исходного изображения.
      pixelCrop.height, //  — Высота области обрезки на исходном изображении. Определяет, сколько пикселей по вертикали будет захвачено от исходного изображения.
      0, //(начальный x для канваса) — Координата x на канвасе, с которой начнется отрисовка обрезанной области. В данном случае это 0, то есть рисунок начнется с самого начала канваса по горизонтали.
      0, //(начальный y для канваса) — Координата y на канвасе, с которой начнется отрисовка обрезанной области. Здесь тоже 0, то есть отрисовка начнется с начала канваса по вертикали.
      pixelCrop.width, //  (ширина для канваса) — Ширина обрезанного изображения на канвасе. Этот параметр указывает, насколько растянуть изображение по горизонтали. В данном случае ширина обрезки и ширина канваса одинаковы, что предотвращает искажения.
      pixelCrop.height //  (высота для канваса) — Высота обрезанного изображения на канвасе. Этот параметр определяет, насколько растянуть изображение по вертикали. Здесь высота обрезки и высота канваса одинаковы, что также предотвращает искажения.
    )
  }

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      // Преобразует изображение на канвасе в `blob` (бинарный объект)
      resolve(blob ? blob : undefined)
      // Второй аргумент `'image/jpeg'` указывает, что формат изображения должен быть JPEG.
    }, 'image/jpeg')
  })
}
