import React from 'react'
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
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, ...props }: Props) => {
  return (
    <Modal {...props}>
      <ModalContent className={'max-w-[492px]'}>
        <ModalTitle asChild>
          <Typography variant={TypographyVariant.h1} asChild>
            <h2>Add Photo</h2>
          </Typography>
        </ModalTitle>

        <ModalClose className={'absolute top-[18px] right-4'}>
          <DynamicIcon iconId={'Close'} width={28} height={28} />
        </ModalClose>

        <VisibilityToggle>
          <ModalDescription>image post</ModalDescription>
        </VisibilityToggle>

        <ModalContentItem className={'flex flex-col justify-center pt-[70px] pb-12'}>
          <div className={'flex justify-center'}>
            <PhotoPreview image={''} size={20} />
          </div>
          <div className={'flex flex-col mx-auto'}>
            <Button className={'mb-6 mt-10'}>
              <Typography variant={TypographyVariant.h3}>Select from Computer</Typography>
            </Button>
            <Button variant={'outline'}>
              <Typography variant={TypographyVariant.h3}>Open Draft</Typography>
            </Button>
          </div>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
