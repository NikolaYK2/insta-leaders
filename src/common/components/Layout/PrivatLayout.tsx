import React, { PropsWithChildren, ReactElement } from "react";
import { BaseLayout, Sidebar } from "@/common/components";
import { NextPage } from "next";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="flex flex-1 max-w-screen-desktop w-full">
        <Sidebar />
        {children}
      </div>
    </BaseLayout>
  );
};

export const PrivateLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
