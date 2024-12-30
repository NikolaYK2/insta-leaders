import { Button, DynamicIcon } from "@nikolajk2/lib-insta-leaders";
import React from "react";
import { cn } from "@/common/utils/cn";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";
import { ImagesPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

type CarouselBtn = {
  id: string;
  iconId: "ArrowIosForward";
  classname: string;
};
const carouselBtn: CarouselBtn[] = [
  {
    id: "next",
    iconId: "ArrowIosForward",
    classname: "left-3 rotate-180",
  },
  {
    id: "back",
    iconId: "ArrowIosForward",
    classname: "right-3",
  },
];

type CallbackType = (index: number) => void | { type: string; payload: number };

type CarouselBtnProps<T = []> = {
  arrayItems: T[];
  indexItems: number;
  callback: CallbackType;
};
export const CarouselBtn = <T extends ImagesPublicPosts>({
  arrayItems,
  indexItems,
  callback,
}: CarouselBtnProps<T>) => {
  const dispatch = useAppDispatch();
  const isPreviousHidden = indexItems === 0;
  const isNextHidden = indexItems === arrayItems.length - 1;

  // для слайдов
  const handleGetCarousel = (idBtn: string) => {
    const newIndex =
      idBtn === "back"
        ? Math.min(indexItems + 1, arrayItems.length - 1) // Переход к следующему изображению
        : Math.max(indexItems - 1, 0); // Переход к предыдущему изображению

    const result = callback(newIndex);

    // Если `callback` возвращает экшен, отправляем его через `dispatch`
    if (result && typeof result === "object" && "type" in result) {
      dispatch(result);
    } // dispatch(setIndexCropImage(newIndex))
  };

  return (
    <>
      {/*КНОПКИ СЛАЙДА*/}
      {carouselBtn.map((btn) => (
        <Button
          key={btn.id}
          className={cn(
            "absolute top-[50%] p-2 bg-dark-500/80 text-light-100 hover:bg-dark-500 transition duration-200",
            arrayItems.length === 1 && "hidden",
            btn.id === "next" && isPreviousHidden && "hidden",
            btn.id === "back" && isNextHidden && "hidden",
            btn.classname,
          )}
          variant={"text"}
          onClick={() => handleGetCarousel(btn.id)}
        >
          <DynamicIcon iconId={btn.iconId} width={24} height={24} />
        </Button>
      ))}
    </>
  );
};
