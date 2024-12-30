import React, { useCallback, useState } from "react";
import { ImageForCreate } from "@/features/userHub/ui/create/ui/image/ImageForCreate";
import { useAppDispatch, useAppSelector } from "@/appRoot/lib/hooks/hooksStore";
import {
  selectorIndexCropImage,
  selectorSelectedImages,
} from "@/features/userHub/model/createSlice/createSelectors";
import {
  CreatePrimitiveContent,
  CreatePrimitiveRoot,
} from "@/features/userHub/ui/create/ui/primitives/CreatePrimitive";
import { CarouselBtn } from "@/features/userHub/ui/create/ui/carouselBtn";
import { AddPhotoPreview } from "@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddPhotoModal";
import { FormTextarea } from "@/common/components/ControllerTextarea";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DynamicIcon,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { FormInput } from "@/common/components";
import { cn } from "@/common/utils/cn";
import { showAlert } from "@/appRoot/app.slice";
import { convertBlobUrlToFile, indexDBUtils } from "@/common/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProfileQuery } from "@/features/userHub/api/profile/profileService";
import {
  deleteImages,
  setIndexCropImage,
} from "@/features/userHub/model/createSlice";
import {
  useCreatePostsDescriptionMutation,
  useCreatePostsImagesMutation,
} from "@/features/userHub/api/post/postService";
import { useRouter } from "next/router";
import { ROUTES_APP } from "@/appRoot/routes/routes";
import { LocalStorageUtil } from "@/common/utils/LocalStorageUtil";
import { useSaveForm } from "@/common/hooks/useSaveForm";
import { ImagesPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

const maxLitters = 500;

const publishSchema = z.object({
  location: z.string().optional(),
  description: z.string().max(maxLitters, "max 500 litters"),
  images: z.array(z.any()),
});

type FormType = z.infer<typeof publishSchema>;

type Props = {
  onOpenChange: ((open: boolean) => void) | undefined;
};
export const Publication = ({ onOpenChange }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: profile } = useGetProfileQuery();
  const [createPostsImages] = useCreatePostsImagesMutation();
  const [createPostsDescription] = useCreatePostsDescriptionMutation();
  const images = useAppSelector(selectorSelectedImages);
  const indexImage = useAppSelector(selectorIndexCropImage);
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { handleSubmit, control, watch, reset } = useForm<FormType>({
    defaultValues: {
      description: "",
      images,
    },
    resolver: zodResolver(publishSchema),
  });

  const littersPublicationDescription = watch("description")?.length || 0;

  // 1. загрузка фото
  const uploadImages = useCallback(
    async (images: ImagesPublicPosts[]) => {
      // преобразуем images in Blob
      const filePromises = images.map((image: ImagesPublicPosts) =>
        convertBlobUrlToFile(image.url, "photo.jpg"),
      );
      const filesImages = await Promise.all(filePromises);

      return await createPostsImages(filesImages).unwrap(); //Сначала загружаем картинки
    },
    [createPostsImages],
  );

  //2. финальная отправка формы
  const submitPost = useCallback(
    async (description: string, uploadIds: { uploadId: string }[]) => {
      const finalData = { description, childrenMetadata: uploadIds };
      await createPostsDescription(finalData);
    },
    [createPostsDescription],
  );

  const resetForm = () => {
    onOpenChange?.(false);
    dispatch(deleteImages());
    LocalStorageUtil.removeItem("publicationForm");
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true); // Включаем индикатор загрузки

    try {
      const resImages = await uploadImages(data.images);

      //получаем id наших картинок
      const uploadIds =
        resImages.images?.map((image) => ({ uploadId: image.uploadId })) || [];

      await submitPost(data.description, uploadIds);
      //очищаем черновик
      await indexDBUtils.clearAllImages();
      //перенаправляем на профиль что-бы видеть добавленные новые посты
      await route.push(`${ROUTES_APP.PROFILE}/${profile?.id}`);

      resetForm();
    } catch (error) {
      console.error("Ошибка при создании публикации:", error);
      // Проверяем, что error — объект и имеет свойство 'data'
      if (typeof error === "object" && error !== null && "data" in error) {
        const errorData = error.data as { message?: string };

        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "message" in errorData
        ) {
          const message = errorData.message ?? "error";
          dispatch(showAlert({ message, variant: "alertError" }));
        }
      }
    } finally {
      setIsLoading(false); // Снимаем индикатор загрузки
    }
  };

  useSaveForm({
    watch,
    reset,
    valueKey: "publicationForm",
    saveValue: (value) => {
      const { images, ...form } = value;
      LocalStorageUtil.setValue("publicationForm", form);
    },
    getValue: () => LocalStorageUtil.getValue("publicationForm"),
  });

  return (
    <CreatePrimitiveRoot>
      {isLoading && (
        <div
          className={cn(
            "absolute indent-0 flex justify-center items-center",
            "bg-dark-500/50 w-full h-full z-50",
            "text-[40px] font-bold",
          )}
        >
          {Array.from("Creating...").map((char, index) => (
            <span
              key={index}
              className={`animate-bounce inline-block`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      )}
      <CreatePrimitiveContent>
        <ImageForCreate images={images} indexImage={indexImage} />
        <CarouselBtn
          arrayItems={images}
          indexItems={indexImage}
          callback={setIndexCropImage}
        />
      </CreatePrimitiveContent>
      <CreatePrimitiveContent className={"relative flex-col w-full p-7"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"flex items-center mb-7"}>
            <AddPhotoPreview
              image={profile?.avatars[0]?.url ?? ""}
              containerClassName={"rounded-full w-9 h-9 overflow-hidden"}
              size={36}
            />
            <p className={"mx-3"}>{profile?.userName}</p>
          </div>
          <FormTextarea
            name={"description"}
            label={"Add publication descriptions"}
            control={control}
          />
          <Typography
            className={cn(
              "text-right text-light-900 mb-5",
              littersPublicationDescription > maxLitters && "text-danger-500",
            )}
            variant={TypographyVariant.small_text}
          >
            {`${littersPublicationDescription} / ${maxLitters}`}
          </Typography>
          <div
            className={cn(
              "before:content-[''] ",
              "before:absolute before:h-[1px] ",
              "before:bg-dark-100 before:left-0 ",
              "before:w-full",
            )}
          >
            <div className={"pt-7"}>
              <FormInput
                name={"location"}
                label={"Add location"}
                control={control}
                placeholder={"Location"}
                iconEnd={<DynamicIcon iconId={"PinOutline"} />}
              />
            </div>
          </div>
          <Button
            className={"fixed top-3 right-0"}
            variant={"text"}
            disabled={isLoading}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant={TypographyVariant.h3}>Publish</Typography>
          </Button>
        </form>
      </CreatePrimitiveContent>
    </CreatePrimitiveRoot>
  );
};
