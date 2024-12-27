import React from "react";
import { HeadersMeta } from "@/common/components";
import { useSearchParams } from "next/navigation";
import { useAuthByGithubQuery } from "@/features/auth/api/authService";

function Github() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  const { data, isError, isLoading } = useAuthByGithubQuery(
    { code },
    { skip: !code },
  );

  return (
    <div>
      <HeadersMeta
        title={"Github auth"}
        description={"Test page for GH auth"}
      />
      <div>{code}</div>
    </div>
  );
}

export default Github;
