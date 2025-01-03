import React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { Profile } from "@/common/components/profile/Profile";
import { useGetPublicPostQuery } from "@/features/userHub/api/publicPosts/publicPostsService";
import { useGetPublicUserProfileQuery } from "@/features/userHub/api/publicUsers/publicUserService";
import { useRouter } from "next/router";

export const User: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  // const { data: post } = useGetPublicPostQuery({
  //   postld: id,
  // });
  const { data: profile } = useGetPublicUserProfileQuery({
    profileId: id,
  });

  return <Profile profile={profile} userId={id} />;
};
