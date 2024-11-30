import { AppState } from '@/appRoot/store'
import { SelectedImages } from '@/features/userHub/model/createSlice/createSlice'

export const selectorSelectedImages = (state: AppState): SelectedImages[] =>
  state.create.selectedImages

export const selectorIndexCropImage = (state: AppState) => state.create.indexCropImage

export const errorSelector = (state: AppState) => state.create.error
