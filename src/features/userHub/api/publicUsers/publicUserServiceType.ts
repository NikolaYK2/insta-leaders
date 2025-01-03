import { ResProfile } from "@/features/userHub/api/profile/profileServiceType";

export type UserMetadata = {
  following: number;
  followers: number;
  publications: number;
};

export type ResPublicProfile = ResProfile & {
  userMetadata?: UserMetadata;
};
