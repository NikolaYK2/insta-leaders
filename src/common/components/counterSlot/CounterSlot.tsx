import React from "react";
import { Typography, TypographyVariant } from "@nikolajk2/lib-insta-leaders";
import { cn } from "@/common/utils/cn";
import { useGetPublicUsersQuery } from "@/features/userHub/api/publicUsers/publicUserService";

export const CounterSlot = () => {
  const { data: users, isLoading: loadUsers } = useGetPublicUsersQuery(
    undefined,
    {
      pollingInterval: 60000,
    },
  );

  if (loadUsers) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex justify-between items-center px-6 py-3 bg-dark-500 border-[1px] border-dark-300">
      <Typography variant={TypographyVariant.h2} asChild>
        <h2>Registered users:</h2>
      </Typography>
      <div className="flex p-3 bg-dark-700 border-[1px] border-dark-300">
        {String(users?.totalCount)
          .padStart(6, "0")
          .split("")
          .map((value, i) => (
            <div
              className={cn(
                "relative flex justify-center",
                'after:content-[""]',
                "after:absolute",
                "after:top-0",
                "after:right-0",
                "after:w-[1px]",
                "after:h-full",
                "after:bg-dark-300",
                "last:after:hidden",
              )}
              key={i}
            >
              <Typography
                className={cn("flex justify-center w-6 h-6 mr-[3px]")}
                variant={TypographyVariant.h2}
              >
                {value}
              </Typography>
            </div>
          ))}
      </div>
    </section>
  );
};
