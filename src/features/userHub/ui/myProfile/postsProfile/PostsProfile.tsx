import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useGetsPostsByUsernameQuery } from '@/features/userHub/api/post/postService'
import { PostsByUsernameParams } from '@/features/userHub/api/post/postServiceType'

type Props = {
  username: string
}

export const PostsProfile = ({ username }: Props) => {
  const [pageNumber, setPageNumber] = useState(1) // Номер текущей страницы
  const [posts, setPosts] = useState<any[]>([]) // Список всех постов

  const loadMoreRef = useRef<HTMLDivElement | null>(null) // Ссылка на div для отслеживания
  const observer = useRef<IntersectionObserver | null>(null) // Ссылка на IntersectionObserver

  const params: PostsByUsernameParams = {
    username,
    pageSize: 8,
    pageNumber,
    sortBy: '',
    sortDirection: 'desc',
  }

  const { data, isLoading, isFetching, isError } = useGetsPostsByUsernameQuery(params, {
    skip: !username, // Пропуск запроса, если username не передан
  })

  // Добавляем новые посты при изменении данных
  useEffect(() => {
    if (data?.items) {
      setPosts(prev => [...prev, ...data.items])
    }
  }, [data])

  //  IntersectionObserver - чувак который отслеживает появления элемента внизу страницы и динамически увеличивать номер страницы pageNumber
  useEffect(() => {
    if (!loadMoreRef.current) return

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching && data?.items.length) {
        setPageNumber(prev => prev + 1) // Увеличиваем номер страницы
      }
    })

    observer.current.observe(loadMoreRef.current)

    return () => {
      if (observer.current) {
        observer.current.disconnect() // Очищаем наблюдатель
      }
    }
  }, [isFetching, data?.items])

  if (isLoading && pageNumber === 1) return <>Загрузка постов....</>
  if (isError) return <>Ошибка загрузки постов</>

  return (
    <section className={'flex flex-wrap m-[-8px]'}>
      {posts.length > 0
        ? posts.map(item => (
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
      {isFetching && <div>Загрузка еще...</div>}
      {/* Элемент для отслеживания появления */}
      <div ref={loadMoreRef} className="w-full h-2"></div>
    </section>
  )
}
