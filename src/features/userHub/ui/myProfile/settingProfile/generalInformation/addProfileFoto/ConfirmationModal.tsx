import {
  Modal,
  ModalTrigger,
  DynamicIcon,
  ModalContent,
  ModalTitle,
  Typography,
  TypographyVariant,
  ModalContentItem,
  ModalDescription,
  ModalClose,
  Button,
  IconId,
} from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'

type ModalProps = {
  confirmation: () => void
  className?: string
  iconId?: IconId
}

export const ConfirmationModal = ({
  confirmation,
  className,
  iconId = 'CloseOutline',
}: ModalProps) => {
  return (
    <Modal>
      <ModalTrigger
        className={cn(
          'cursor-pointer absolute top-[19px] right-2.5 flex items-center justify-center w-6 h-6',
          className
        )}
      >
        <DynamicIcon
          className={'border-4 border-black rounded-full bg-danger-500 hover:bg-danger-300'}
          iconId={iconId}
          width={24}
          color="white"
        />
      </ModalTrigger>
      <ModalContent className={'w-full max-w-[492px]'}>
        <ModalTitle className={'text-light-100'}>
          <Typography variant={TypographyVariant.h2}>Delete Photo</Typography>
        </ModalTitle>

        <ModalContentItem className={'flex flex-col gap-6 items-center w-full p-6 pb-24'}>
          <ModalDescription>
            <Typography className={'text-light-100'} variant={TypographyVariant.regular_text_16}>
              Are you sure you want to delete the photo?
            </Typography>
          </ModalDescription>
          <div>
            <ModalClose>
              <Button variant={'outline'}>No</Button>
            </ModalClose>
            <Button onClick={confirmation} variant={'primary'}>
              Yes
            </Button>
          </div>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
