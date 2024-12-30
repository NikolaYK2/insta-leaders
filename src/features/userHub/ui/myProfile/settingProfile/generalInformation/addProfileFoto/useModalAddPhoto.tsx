import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";
import { PayloadAction } from "@reduxjs/toolkit";
import { hiddenAlert, showAlert } from "@/appRoot/app.slice";
import { indexDBUtils } from "@/common/utils";
import { ImagesPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

type UseModalAddPhotoProps = {
  setImage?: (image: null | string) => void;
  photoLimit?: number;
  photosLength?: number;
  errorMessage?: string;
  localError?: string | null;
  setActionForImages?: (
    payload: ImagesPublicPosts,
  ) => PayloadAction<ImagesPublicPosts>;
  deleteActionForImages?: () => PayloadAction<void>;
};

export const useModalAddPhoto = ({
  setImage,
  photoLimit,
  photosLength,
  errorMessage = "",
  localError = null,
  setActionForImages,
  deleteActionForImages,
}: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(localError);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [isSaved, setIsSaved] = useState(false);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const ALLOWED_FORMATS = ["image/jpeg", "image/png"];

  const reset = async () => {
    await indexDBUtils.clearAllImages();
    setSelectedImage(null);
    deleteActionForImages && dispatch(deleteActionForImages());
    setError(null);
    setIsSaved(false);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError("The format of the uploaded photo must be PNG and JPEG");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Photo size must be less than 10 MB!");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const newImage = e.target?.result as string;
      setSelectedImage(newImage);
    };

    reader.readAsDataURL(file);

    // Создаем объект для обновления состояния
    const newImages: ImagesPublicPosts = {
      uploadId: Date.now().toString(), // Генерируем уникальный ключ для нового изображения
      url: URL.createObjectURL(file as Blob), // Генерируем URL для отображения изображения
    };

    try {
      await indexDBUtils.saveImage({ ...newImages, url: file }); // Сохраняем Blob в IndexedDB

      // Обновляем состояние, добавляя новое изображение
      if (photosLength && photoLimit && photosLength >= photoLimit) {
        dispatch(
          showAlert({ message: errorMessage ?? "", variant: "alertError" }),
        );
      } else if (setActionForImages) {
        dispatch(setActionForImages(newImages));
      }
    } catch (err) {
      console.error("Error saving image to IndexedDB:", err);
      setError("Failed to save image. Please try again.");
    }

    event.target.value = "";
  };

  const handleSave = () => {
    if (selectedImage && setImage) {
      setImage(selectedImage);
      setError(null);
      setIsSaved(true);
    }
  };
  // Устанавливаем таймер для очистки ошибки
  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => {
        setError(null);
        dispatch(hiddenAlert());
      }, 5000);
    }

    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [error, dispatch]);

  return {
    error,
    setError,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
    reset,
  };
};
