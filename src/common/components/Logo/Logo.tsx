import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

export const Logo = () => (
  <div className="relative flex">
    <Typography variant={TypographyVariant.large}>S</Typography>
    <Typography
      className="transform translate-y-[6px] translate-x-[-6.4px] text-accent-500"
      variant={TypographyVariant.large}
    >
      P
    </Typography>
  </div>
)
