import React from "react";
import {
  DynamicIcon,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { useLogOut } from "@/common/utils/useLogOut";

const LogOut = () => {
  const { onLogOut } = useLogOut();

  return (
    <button onClick={onLogOut} className={"flex items-center"}>
      <DynamicIcon
        className={"mr-[19px]"}
        iconId={"LogOut"}
        width={"24"}
        height={"24"}
      />
      <Typography variant={TypographyVariant.medium_text_14}>
        Log Out
      </Typography>
    </button>
  );
};

export default LogOut;
