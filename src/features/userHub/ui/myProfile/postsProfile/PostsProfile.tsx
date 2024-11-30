import React from 'react'
import Image from 'next/image'
import { useGetsPostsByUsernameQuery } from '@/features/userHub/api/post/postService'

type Props = {
  userName: string
}
export const PostsProfile = ({ userName }: Props) => {
  const { data, isLoading, isError } = useGetsPostsByUsernameQuery(userName)
  if (isLoading) return <>Загрузка постов....</>

  return (
    <section className={'flex flex-wrap m-[-8px]'}>
      {data?.items
        ? data.items.map(item => (
            <Image
              className={'flex-[0_1_234px] h-[228px] m-[6px] object-cover'}
              key={item.id}
              src={item.images[0].url}
              alt={`Picture of ${item.id}`}
              width={234}
              height={228}
            />
          ))
        : 'Нет постов'}
    </section>
  )
}
