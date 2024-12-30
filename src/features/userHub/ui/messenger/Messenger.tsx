import React from "react";
import { HeadersMeta } from "@/common/components";
import { NextPageWithLayout } from "@/pages/_app";

export const Messenger: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta
        title={"Messenger"}
        description={"Communicate with others through the messenger"}
      />
      <h2>Messenger</h2>
    </div>
  );
};
