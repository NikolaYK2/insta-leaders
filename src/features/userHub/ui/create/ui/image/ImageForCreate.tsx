import React from 'react'
import Image from 'next/image'
import { SelectedImages } from '@/features/userHub/model/createSlice'

type Props = {
  images: SelectedImages[]
  indexImage: number
}
export const ImageForCreate = ({ images, indexImage }: Props) => {
  return (
    <Image
      className="flex object-contain"
      src={images[indexImage].image}
      alt="image"
      width={490}
      height={503}
    />
  )
}
