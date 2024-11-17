import React, { useEffect, useState } from 'react'
import {
  Button,
  DynamicIcon,
  Modal,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalProps,
  ModalTitle,
  Typography,
  TypographyVariant,
  VisibilityToggle,
} from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import { selectorSelectedImages } from '@/features/userHub/model/createSlice/createSelectors'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/useModalAddPhoto'
import { deleteImages } from '@/features/userHub/model/createSlice'
import { ConfirmationModal } from '@/common/components/ConfirmationModal'
import { loadImages } from '@/features/userHub/ui/create/lib/loadImages'
import { AddPhoto } from '@/features/userHub/ui/create/ui/addPhoto'
import { Cropping } from '@/features/userHub/ui/create/ui/cropping'
import { Filters } from '@/features/userHub/ui/create/ui/filters/Filters'
import { showAlert } from '@/appRoot/app.slice'

// Тип для переключения между состояниями
type SwitchCreate = 'addPhoto' | 'cropping' | 'filters'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, open, onOpenChange, ...props }: Props) => {
  const [switchCreate, setSwitchCreate] = useState<SwitchCreate>('addPhoto')
  const images = useAppSelector(selectorSelectedImages)
  const image = Boolean(images.length)
  const dispatch = useAppDispatch()
  const { reset } = useModalAddPhoto({
    deleteActionForImages: deleteImages,
  })

  // Логика кнопки "Назад"
  const handleBackClick = () => {
    if (switchCreate === 'filters') {
      setSwitchCreate('cropping')
    } else if (switchCreate === 'cropping') {
      reset().catch(error =>
        dispatch(showAlert({ message: error + ': фото не удалены!', variant: 'alertError' }))
      )
      // Возврат к начальному состоянию, удаление фото
    }
  }
  // Логика кнопки "Вперед"
  const handleNextClick = () => {
    if (switchCreate === 'cropping') {
      setSwitchCreate('filters')
    }
  }

  // Установка начального состояния при наличии изображений
  useEffect(() => {
    setSwitchCreate(image ? 'cropping' : 'addPhoto')
  }, [image])

  // Загрузка изображений при монтировании
  useEffect(() => {
    //получаем фото из хранилища indexDB
    loadImages(dispatch).catch(e => console.error(e, ': Error load images indexDB!'))
  }, [])

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className={cn(
          'flex flex-col max-w-[492px] h-[564px]',
          switchCreate === 'filters' && 'max-w-[972px] h-auto'
        )}
      >
        <ModalTitle className={cn('flex', image && 'justify-center')} asChild>
          <Typography variant={TypographyVariant.h1} asChild>
            <h2>{switchTitleCreate(switchCreate)}</h2>
          </Typography>
        </ModalTitle>
        {image ? (
          <>
            {/*BUTTON BACK*/}
            {/*кнопка удаления картинок и возврат к добавлению фото*/}
            {switchCreate === 'cropping' && (
              <ConfirmationModal
                className={
                  'absolute top-[16px] left-3.5 p-0 w-[30px] h-[30px] rounded-none bg-transparent'
                }
                iconId={'ArrowIosBack'}
                description={
                  'Do you really want to close the creation of a publication? If you close everything will be deleted'
                }
                confirmation={reset}
              />
            )}
            {/*кнопка возврата*/}
            {image && switchCreate !== 'cropping' && (
              <Button
                className={
                  'absolute top-[16px] left-3.5 p-0 w-[30px] h-[30px] rounded-none bg-transparent'
                }
                onClick={handleBackClick}
              >
                <DynamicIcon iconId={'ArrowIosBack'} />
              </Button>
            )}
            {/*BUTTON BACK*/}

            <Button
              className={'absolute top-[11px] right-1'}
              onClick={handleNextClick}
              variant={'text'}
            >
              <Typography variant={TypographyVariant.h3}>Next</Typography>
            </Button>
          </>
        ) : (
          <ModalClose
            className={'absolute top-[18px] right-4'}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <DynamicIcon iconId={'Close'} width={28} height={28} />
          </ModalClose>
        )}

        {/*скрываем описание*/}
        <VisibilityToggle>
          <ModalDescription>{switchTitleCreate(switchCreate)}</ModalDescription>
        </VisibilityToggle>

        {/*ITEMS*/}
        <ModalContentItem
          className={cn(
            'relative flex flex-col pt-[0px] h-full z-50 p-12',
            switchCreate === 'cropping' && 'p-3',
            switchCreate === 'filters' && 'p-0'
          )}
        >
          {switchCreatePhotos(switchCreate, Boolean(image))}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}

//Для переключения состояний настройки поста
const switchCreatePhotos = (switchCreate: SwitchCreate, image: boolean) => {
  const components = {
    addPhoto: <AddPhoto />,
    cropping: image ? <Cropping /> : null,
    filters: image ? <Filters /> : null,
  }

  return components[switchCreate] || null
}

//Для тайтла Create
const switchTitleCreate = (switchCreate: SwitchCreate): string =>
  ({
    cropping: 'Cropping',
    filters: 'Filters',
    addPhoto: 'Add Photo',
  })[switchCreate] || 'Add Photo'
