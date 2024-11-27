import React from 'react'
import { ImageForCreate } from '@/features/userHub/ui/create/ui/image/ImageForCreate'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import {
  selectorIndexCropImage,
  selectorSelectedImages,
} from '@/features/userHub/model/createSlice/createSelectors'
import {
  CreatePrimitiveContent,
  CreatePrimitiveRoot,
} from '@/features/userHub/ui/create/ui/primitives/CreatePrimitive'
import { CarouselBtn } from '@/features/userHub/ui/create/ui/carouselBtn'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'
import { AddPhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddPhotoModal'
import { FormTextarea } from '@/common/components/ControllerTextarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { FormInput } from '@/common/components'
import { cn } from '@/common/utils/cn'
import {
  useCreatePostsMutation,
  useCreatePostsPhotosMutation,
} from '@/features/userHub/api/post/postService'
import { showAlert } from '@/appRoot/app.slice'
import { indexDBUtils } from '@/common/utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const maxLitters = 500

const publishSchema = z.object({
  location: z.string(),
  text: z.string().max(maxLitters, 'max 500 litters'),
  photosIds: z.array(z.string()),
})

type FormType = z.infer<typeof publishSchema>
// type Form = {
//   text: string
//   location: string
//   photosIds: string[]
// }
export const Publication = () => {
  const { data: me } = useGetUsersMeQuery()
  const [createPostsPhotos] = useCreatePostsPhotosMutation()
  const [createPosts] = useCreatePostsMutation()
  const images = useAppSelector(selectorSelectedImages)
  const indexImage = useAppSelector(selectorIndexCropImage)
  const dispatch = useAppDispatch()

  const { handleSubmit, control, setValue, watch } = useForm<FormType>({
    defaultValues: {
      text: '',
      location: '',
      photosIds: [],
    },
    resolver: zodResolver(publishSchema),
  })

  const litters = watch('text').length

  const onSubmit: SubmitHandler<FormType> = async data => {
    console.log(data)
    try {
      // 1. Загрузка фото
      // const res = await createPostsPhotos(images).unwrap()
      // const uploadPhotoResponse = await api.post('/api/v1/posts/photos', {
      //   photoFile: images[indexImage],
      // })
      // 1. Преобразуем blob URL в File

      const filePromises = images.map(image => convertBlobUrlToFile(image.image, 'photo.jpg'))
      const files = await Promise.all(filePromises)

      // 2. Отправляем фото по очереди
      const photoIds: string[] = []

      for (const file of files) {
        const res = await createPostsPhotos([file]).unwrap()
        if (res.data.photoId) {
          photoIds.push(res.data.photoId) // Сохраняем ID каждой загруженной фотографии
        }
      }
      console.log(photoIds, 'ids')
      // const res = await createPostsPhotos(files).unwrap()

      // // 2. Добавление ID загруженного фото в форму
      // const photoId = res.data.photoId
      setValue('photosIds', photoIds)

      // // 3. Отправка публикации
      await createPosts(data).unwrap()
      // // const postResponse = await api.post('/api/v1/posts', data)
      // // console.log('Публикация создана:', postResponse.data)
      await indexDBUtils.clearAllImages()
    } catch (error) {
      console.error('Ошибка при создании публикации:', error)
      // Проверяем, что error — объект и имеет свойство 'data'
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string }

        if (typeof errorData === 'object' && errorData !== null && 'message' in errorData) {
          const message = errorData.message ?? 'error'
          dispatch(showAlert({ message, variant: 'alertError' }))
        }
      }
    }
  }

  return (
    <CreatePrimitiveRoot>
      <CreatePrimitiveContent>
        <ImageForCreate images={images} indexImage={indexImage} />
        <CarouselBtn arrayItems={images} indexItems={indexImage} />
      </CreatePrimitiveContent>
      <CreatePrimitiveContent className={'relative flex-col w-full p-7'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex items-center mb-7'}>
            <AddPhotoPreview
              image={me?.data?.avatar ?? ''}
              containerClassName={'rounded-full w-9 h-9 overflow-hidden'}
              size={36}
            />
            <p className={'mx-3'}>{me?.data.userName}</p>
          </div>
          <FormTextarea name={'text'} label={'Add publication descriptions'} control={control} />
          <Typography
            className={cn(
              'text-right text-light-900 mb-5',
              litters > maxLitters && 'text-danger-500'
            )}
            variant={TypographyVariant.small_text}
          >
            {`${litters} / ${maxLitters}`}
          </Typography>
          <div
            className={cn(
              "before:content-[''] ",
              'before:absolute before:h-[1px] ',
              'before:bg-dark-100 before:left-0 ',
              'before:w-full'
            )}
          >
            <div className={'pt-7'}>
              <FormInput
                name={'location'}
                label={'Add location'}
                control={control}
                placeholder={'Location'}
                iconEnd={<DynamicIcon iconId={'PinOutline'} />}
              />
            </div>
          </div>
          <Button
            className={'fixed top-3 right-0'}
            variant={'text'}
            onClick={e => e.stopPropagation()}
          >
            <Typography variant={TypographyVariant.h3}>Publish</Typography>
          </Button>
        </form>
      </CreatePrimitiveContent>
    </CreatePrimitiveRoot>
  )
}

const convertBlobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
  const response = await fetch(blobUrl) // Загружаем blob по URL
  const blob = await response.blob() // Преобразуем в Blob
  return new File([blob], fileName, { type: blob.type }) // Преобразуем в File
}
