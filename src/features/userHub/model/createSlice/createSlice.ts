import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SelectedImages = {
  id: string
  image: string
}
export type InitialStateCreat = {
  selectedImages: SelectedImages[]
  indexCropImage: number
  error: null | string
}
const initialStateCreate: InitialStateCreat = {
  selectedImages: [],
  indexCropImage: 0,
  error: null,
}
const slice = createSlice({
  name: 'create',
  initialState: initialStateCreate,
  reducers: {
    setImage: (state, action: PayloadAction<SelectedImages>) => {
      state.selectedImages.push(action.payload)
      state.indexCropImage = state.selectedImages.length - 1 // Устанавливаем индекс на последнее изображение,
      // а значит переключаемся на добавленное фото
    },
    setImages: (state, action: PayloadAction<SelectedImages[]>) => {
      state.selectedImages = action.payload
    },
    setCroppedImage: (state, action: PayloadAction<{ url: string }>) => {
      const index = state.selectedImages.findIndex((img, i) => i === state.indexCropImage)
      if (index !== -1) state.selectedImages[index].image = action.payload.url
    },
    setIndexCropImage: (state, action: PayloadAction<number>) => {
      state.indexCropImage = action.payload
    },
    deleteImage: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.selectedImages.findIndex(image => image.id === action.payload.id)
      if (index !== -1) {
        // а значит показываем последнее еще имеющееся фото
        state.selectedImages.splice(index, 1)

        state.indexCropImage = Math.max(0, state.selectedImages.length - 1) // Устанавливаем индекс на последнее изображение,
      }
    },
    deleteImages: state => {
      state.selectedImages = []
      state.indexCropImage = 0
    },
  },
})

export const createPostReducer = slice.reducer
export const {
  setImages,
  setImage,
  deleteImage,
  deleteImages,
  setCroppedImage,
  setIndexCropImage,
} = slice.actions
