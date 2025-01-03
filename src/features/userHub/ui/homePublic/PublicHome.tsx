import React, { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { CounterSlot } from "@/common/components/counterSlot";
import { Page } from "@/common/components/page";
import { useGetPublicPostsQuery } from "@/features/userHub/api/publicPosts/publicPostsService";
import {
  Button,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { timeAgo } from "@/common/utils/timeAge";
import { CarouselBtn } from "@/features/userHub/ui/create/ui/carouselBtn";
import Image from "next/image";
import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";

const maxLengthDescriptionHide = 83;
const maxLengthDescriptionShow = 235;

export const HomePublic: NextPageWithLayout = () => {
  const [showDescription, setShowDescription] = useState(false);
  const { data: publicPosts, isLoading: loadPublicPosts } =
    useGetPublicPostsQuery(
      { endCursorPostId: 4, pageSize: 4 },
      {
        pollingInterval: 6000000,
      },
    );
  const [postIndices, setPostIndices] = useState<Record<number, number>>({});

  const handleSetPostIndex = (postId: number, newIndex: number) => {
    setPostIndices((prev) => ({
      ...prev,
      [postId]: newIndex,
    }));
  };

  const truncatedText = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "... ";
    } else {
      return description + " ";
    }
  };

  const clickSwitchShowDescription = () => {
    setShowDescription(!showDescription);
  };

  if (loadPublicPosts) {
    return <div>Loading...</div>;
  }

  return (
    <Page
      titleMeta={"Home public"}
      descriptionMeta={"Explore the public section of our platform."}
    >
      <CounterSlot />

      <section className={cn("flex flex-wrap justify-between mx-[-6px] my-9")}>
        {publicPosts?.items.map((item) => {
          const currentIndex = postIndices[item.id] ?? 0;
          return (
            <div
              className={
                "relative max-w-[234px] w-full mx-[6px]  max-h-[391px] pb-[150px]"
              }
              key={item.id}
            >
              <div className={"relative max-h-[240px]"}>
                <Image
                  className={"cover h-[240px]"}
                  src={item.images[currentIndex].url}
                  alt={"images"}
                  width={234}
                  height={240}
                />
                <CarouselBtn
                  arrayItems={item.images}
                  indexItems={currentIndex}
                  callback={(newIndex) => handleSetPostIndex(item.id, newIndex)}
                />
              </div>
              {/*ITEMS ---------------*/}
              <div
                className={cn(
                  "absolute bottom-0 pt-3 min-h-[150px] max-h-[138px] w-full bg-dark-700 overflow-hidden transition-[max-height] duration-1500 ease-in",
                  showDescription && "max-h-full",
                )}
              >
                <Link
                  className={"flex items-center"}
                  href={`${ROUTES_AUTH.USER_PUBLIC}/${item.ownerId}`}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full w-9 h-9 mr-3",
                      !item.avatarOwner && "bg-accent-300",
                    )}
                  >
                    {/*AVATARS ---------------------*/}
                    {item.avatarOwner ? (
                      <Image
                        className={"rounded-full"}
                        src={item.avatarOwner}
                        alt={"avatar"}
                        width={36}
                        height={36}
                      />
                    ) : (
                      <span className={"uppercase text-xl"}>
                        {item.userName[0]}
                      </span>
                    )}
                  </div>
                  <Typography variant={TypographyVariant.h3} asChild>
                    <h3>{item.userName}</h3>
                  </Typography>
                </Link>
                {/*//DESCRIPTION -------------------------*/}
                <div className={"mt-3"}>
                  <Typography
                    className={"text-light-900"}
                    variant={TypographyVariant.small_text}
                  >
                    {timeAgo(item.updatedAt)}
                  </Typography>
                  <Typography
                    className={"break-all"}
                    variant={TypographyVariant.regular_text_14}
                  >
                    {showDescription
                      ? truncatedText(
                          item.description,
                          maxLengthDescriptionShow,
                        )
                      : truncatedText(
                          item.description,
                          maxLengthDescriptionHide,
                        )}

                    {item.description.length > maxLengthDescriptionHide && (
                      <Button
                        className={"p-0 underline"}
                        variant={"text"}
                        onClick={clickSwitchShowDescription}
                      >
                        {showDescription ? "Hide" : "Show more"}
                      </Button>
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </Page>
  );
};
