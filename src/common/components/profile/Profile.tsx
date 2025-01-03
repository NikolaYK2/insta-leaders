import React from "react";
import { useRouter } from "next/router";
import { Page } from "@/common/components/page";
import { InfoProfile } from "@/features/userHub/ui/myProfile/infoProfile/InfoProfile";
import { PostsProfile } from "@/features/userHub/ui/myProfile/postsProfile/PostsProfile";
import { ResProfile } from "@/features/userHub/api/profile/profileServiceType";
import { ItemsPublicPosts } from "@/features/userHub/api/publicPosts/publicPostsServiceType";

type Profile = {
  profile?: ResProfile;
  profilePost?: ItemsPublicPosts;
  redirectSetting?: () => void;
  userId: string;
};
export const Profile = ({ redirectSetting, profile, userId }: Profile) => {
  console.log(userId);
  const isOwner = profile?.id === Number(userId);

  const handlerClickRedirectSetting = () => {
    redirectSetting?.();
  };

  if (profile)
    return (
      <Page
        titleMeta={"My Profile"}
        descriptionMeta={"View and edit your personal profile information"}
      >
        <InfoProfile
          profile={profile}
          isOwner={isOwner}
          onEdit={handlerClickRedirectSetting}
        />

        <PostsProfile username={profile.userName} />
      </Page>
    );
};
