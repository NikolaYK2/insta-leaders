import React from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useGetProfileQuery } from "@/features/userHub/api/profile/profileService";
import { Profile } from "@/common/components/profile/Profile";
import { useAppDispatch } from "@/appRoot/lib/hooks/hooksStore";
import { showAlert } from "@/appRoot/app.slice";

export const MyProfile: NextPageWithLayout = () => {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { data, isLoading, isError, error } = useGetProfileQuery();
  const dispatch = useAppDispatch();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    dispatch(
      showAlert({ variant: "alertError", message: JSON.stringify(error) }),
    );
  }

  return <Profile profile={data} userId={id} />;
};
