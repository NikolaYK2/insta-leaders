import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useGetsPostsByUsernameQuery } from "@/features/userHub/api/post/postService";
import {
  PostItem,
  PostsByUsernameParams,
} from "@/features/userHub/api/post/postServiceType";
import { useAppDispatch, useAppSelector } from "@/appRoot/lib/hooks/hooksStore";
import {
  addPosts,
  clearPosts,
} from "@/features/userHub/model/postsSlice/postsSlice";
import { allPostsSelected } from "@/features/userHub/model/postsSlice/postsSelectors";

type Props = {
  username: string;
};

export const PostsProfile = ({ username }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const posts = useAppSelector(allPostsSelected);
  const dispatch = useAppDispatch();

  const params: PostsByUsernameParams = {
    username,
    pageSize: 8,
    pageNumber,
    sortBy: "",
    sortDirection: "desc",
  };

  const { data, isLoading, isFetching, isError } = useGetsPostsByUsernameQuery(
    params,
    {
      skip: !username,
    },
  );

  // Загружаем посты в глобальный стейт
  useEffect(() => {
    if (data?.items) {
      dispatch(addPosts(data.items));
    }
  }, [data, dispatch]);

  // Очистка постов при смене пользователя
  useEffect(() => {
    dispatch(clearPosts());
    setPageNumber(1);
  }, [username, dispatch]);

  // Настройка IntersectionObserver
  useEffect(() => {
    if (!loadMoreRef.current) return;

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching && data?.items.length) {
        setPageNumber((prev) => prev + 1);
      }
    });

    observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isFetching, data?.items]);

  if (isLoading && pageNumber === 1) return <>Загрузка постов....</>;
  if (isError) return <>Ошибка загрузки постов</>;

  return (
    <section className="flex flex-wrap m-[-8px]">
      {posts.length > 0
        ? posts.map((item: PostItem) => (
            <Image
              className="flex-[0_1_234px] h-[228px] m-[6px] object-cover"
              key={item.id}
              src={item.images[0].url}
              alt={`Picture of ${item.id}`}
              width={234}
              height={228}
            />
          ))
        : "Нет постов"}
      {isFetching && <div>Загрузка еще...</div>}
      <div ref={loadMoreRef} className="w-full h-2"></div>
    </section>
  );
};
