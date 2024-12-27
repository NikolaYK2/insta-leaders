import Image from "next/image";
import {
  Button,
  DynamicIcon,
  Modal,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalTitle,
  ModalTrigger,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { useModalAddPhoto } from "./useModalAddPhoto";
import { useAvatar } from "./useAvatar";

type AddPhotoModalProps = {
  setImage: (image: null | string) => void;
};

export const AddPhotoModal = ({ setImage }: AddPhotoModalProps) => {
  const { handleSubmit } = useAvatar();
  const {
    error,
    fileInputRef,
    reset,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
  } = useModalAddPhoto({ setImage });

  const handleSubmitClick = async () => {
    try {
      // Call handleSave first to save the image and set the necessary state
      handleSave();

      // Call handleSubmit to submit the image
      await handleSubmit(selectedImage);

      // Optionally, you can add any additional logic here after both functions have been called
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild className={"mobile:w-full"}>
        <Button variant={"outline"}>
          <Typography variant={TypographyVariant.h3}>
            Add a Profile Photo
          </Typography>
        </Button>
      </ModalTrigger>
      <ModalContent className={"w-full max-w-[492px]"}>
        <ModalTitle className={"text-light-100"}>
          <Typography
            className={"mobile: w-full"}
            variant={TypographyVariant.h2}
          >
            Add a Profile Photo
          </Typography>
          <ModalClose style={{ left: 0 }}>
            <DynamicIcon
              iconId={"CloseOutline"}
              width={24}
              onClick={reset}
              color={"white"}
            />
          </ModalClose>
        </ModalTitle>
        <ModalContentItem
          className={"flex flex-col gap-[60px] items-center pb-[78px]"}
        >
          <div
            className={`w-full max-w-xs max-h-fit p-1.25 px-10.25 text-center visible opacity-0 bg-danger-900 border-1 border-danger-500 ${
              error ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <Typography variant={TypographyVariant.bold_text_14}>
              Error!
              <Typography variant={TypographyVariant.regular_text_16}>
                {error}
              </Typography>
            </Typography>
          </div>

          <AddPhotoPreview
            image={selectedImage}
            size={228}
            containerClassName={
              "relative overflow-hidden flex items-center justify-center w-[228px] h-[228px] m-0 p-0 bg-dark-500"
            }
          />
          <input
            accept={"image/*"}
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
            type={"file"}
            name={"avatarFile"}
          />
          {selectedImage && !error && !isSaved && (
            <ModalClose asChild>
              <Button
                className={"bg-accent-500"}
                variant={"primary"}
                onClick={handleSubmitClick}
              >
                <Typography variant={TypographyVariant.h3}> Save</Typography>
              </Button>
            </ModalClose>
          )}
          {!selectedImage && !isSaved && (
            <Button
              variant={"primary"}
              className={"bg-accent-500"}
              onClick={handleClick}
              type="button"
            >
              <Typography variant={TypographyVariant.h3}>
                {" "}
                Select from Computer
              </Typography>
            </Button>
          )}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  );
};

type AddPhotoPreviewProps = {
  image: null | string;
  containerClassName: string;
  size: number;
};

export const AddPhotoPreview = ({
  image,
  size,
  containerClassName,
}: AddPhotoPreviewProps) => {
  return (
    <div className={containerClassName}>
      {image ? (
        <div
          className={
            "overflow-hidden flex items-center justify-center w-full h-full"
          }
        >
          <Image
            className={"w-full h-full object-cover object-center"}
            alt={"Uploaded"}
            height={size}
            src={image}
            width={size}
          />
        </div>
      ) : (
        <span className={"flex items-center justify-center w-full h-full"}>
          <DynamicIcon iconId="ImageOutline" height={48} width={48} />
        </span>
      )}
    </div>
  );
};
