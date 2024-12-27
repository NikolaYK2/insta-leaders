import { AppState } from "@/appRoot/store";
import { ImagesPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

export const selectorSelectedImages = (state: AppState): ImagesPublicPosts[] =>
  state.create.selectedImages;

export const selectorIndexCropImage = (state: AppState) =>
  state.create.indexCropImage;

export const errorSelector = (state: AppState) => state.create.error;
