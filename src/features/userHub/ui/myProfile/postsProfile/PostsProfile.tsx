import React from 'react'
import Image from 'next/image'
import { useGetUsersPostsQuery } from '@/features/userHub/api/user/userService'

type Props = {
  profileId: number
}
export const PostsProfile = ({ profileId }: Props) => {
  const { data, isLoading, isError } = useGetUsersPostsQuery(profileId)

  if (isLoading) return <>Загрузка постов....</>

  return (
    <section className={'flex flex-wrap m-[-8px]'}>
      {data?.data.items.map(item => (
        <Image
          className={'flex-[0_1_234px] h-[228px] m-[6px] object-cover'}
          key={item.id}
          src={item.url}
          alt={`Picture of ${item.id}`}
          width={234}
          height={228}
        />
      ))}
    </section>
  )
}
