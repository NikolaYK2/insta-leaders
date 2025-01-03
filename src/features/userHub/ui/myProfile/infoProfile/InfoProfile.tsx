import React from "react";
import {
  Button,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { PhotoPreview } from "@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/PhotoPreview";
import { ResProfile } from "@/features/userHub/api/profile/profileServiceType";

type Props = {
  profile: ResProfile;
  isOwner: boolean;
  onEdit: () => void;
};
export const InfoProfile = ({ isOwner, profile, onEdit }: Props) => {
  return (
    <section className={"flex justify-between flex-wrap mb-12"}>
      <div className={"max-w-[204px] h-[204px] w-full"}>
        <PhotoPreview image={profile?.avatars[0]?.url ?? null} size={204} />
      </div>
      <div className={"w-full max-w-[730px]"}>
        <div className={"flex justify-between items-center mb-5"}>
          <Typography>{profile.userName ?? "User name"}</Typography>
          {isOwner && ( //являешься ли владельцем профиля
            <Button variant={"secondary"} onClick={() => onEdit()}>
              <Typography variant={TypographyVariant.h3}>
                Profile Settings
              </Typography>
            </Button>
          )}
        </div>

        <div className={"flex flex-row mb-7"}>
          <div className={"max-w-[159px] w-full mr-1"}>
            <Typography variant={TypographyVariant.bold_text_14}>
              2 218
            </Typography>
            <Typography variant={TypographyVariant.regular_text_14}>
              Following
            </Typography>
          </div>
          <div className={"max-w-[139px] w-full mr-1"}>
            <Typography variant={TypographyVariant.bold_text_14}>
              2 358
            </Typography>
            <Typography variant={TypographyVariant.regular_text_14}>
              Following
            </Typography>
          </div>
          <div className={""}>
            <Typography variant={TypographyVariant.bold_text_14}>
              2 764
            </Typography>
            <Typography variant={TypographyVariant.regular_text_14}>
              Publications
            </Typography>
          </div>
        </div>

        <Typography variant={TypographyVariant.regular_text_16} className={""}>
          {profile.aboutMe ? (
            <>
              {profile.aboutMe}
              <Typography
                asChild
                variant={TypographyVariant.regular_link}
                className={"cursor-pointer"}
              >
                <span>span span span</span>
              </Typography>
            </>
          ) : (
            "..."
          )}
        </Typography>
      </div>
    </section>
  );
};
