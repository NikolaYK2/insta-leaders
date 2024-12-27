import { Typography, TypographyVariant } from "@nikolajk2/lib-insta-leaders";
import Link from "next/link";
import { ROUTES_AUTH } from "@/appRoot/routes/routes";

export const Logo = () => (
  <Link href={ROUTES_AUTH.HOME} className={"relative flex"}>
    <Typography variant={TypographyVariant.large}>S</Typography>
    <Typography
      className="transform translate-y-[6px] translate-x-[-6.4px] text-accent-500"
      variant={TypographyVariant.large}
    >
      P
    </Typography>
  </Link>
);
