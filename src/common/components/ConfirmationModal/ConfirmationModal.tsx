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
  description?: string
}

export const ConfirmationModal = ({
  confirmation,
  className,
  iconId = 'CloseOutline',
  description = '',
}: ModalProps) => {
  return (
    <Modal>
      <ModalTrigger
        className={cn(
          'cursor-pointer absolute top-[19px] right-2.5 flex items-center justify-center w-4 h-4 bg-danger-500 rounded-full hover:bg-danger-300',
          className
        )}
      >
        <DynamicIcon iconId={iconId} width={24} color="white" />
      </ModalTrigger>
      <ModalContent className={'w-full max-w-[492px]'}>
        <ModalTitle className={'text-light-100'} asChild>
          <Typography variant={TypographyVariant.h2}>Delete Photo</Typography>
        </ModalTitle>

        <ModalContentItem
          className={'flex flex-col max-h-[180px] h-screen justify-between w-full pt-[30px] pb-9'}
        >
          <ModalDescription asChild>
            <Typography className={'text-light-100'} variant={TypographyVariant.regular_text_16}>
              {description || 'Are you sure you want to delete the photo?'}
            </Typography>
          </ModalDescription>
          <div className={'flex justify-between max-w-[216px] w-full ml-auto'}>
            <ModalClose asChild>
              <Button className={'px-[34px]'} variant={'outline'}>
                No
              </Button>
            </ModalClose>
            <Button className={'px-[34px]'} onClick={confirmation} variant={'primary'}>
              Yes
            </Button>
          </div>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
