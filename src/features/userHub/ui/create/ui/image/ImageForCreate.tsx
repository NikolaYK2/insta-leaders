import React from "react";
import Image from "next/image";
import { ImagesPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

type Props = {
  images: ImagesPublicPosts[];
  indexImage: number;
};
export const ImageForCreate = ({ images, indexImage }: Props) => {
  return (
    <Image
      className="flex object-contain"
      src={images[indexImage].url}
      // src={images[indexImage].image}
      alt="image"
      width={490}
      height={503}
    />
  );
};
