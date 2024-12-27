import React from "react";
import { HeadersMeta } from "@/common/components";
import { NextPageWithLayout } from "@/pages/_app";

export const Search: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta
        title={"Search"}
        description={"Search for content, users, or items within the platform"}
      />
      <h2>Search</h2>
    </div>
  );
};
