import React from 'react'
import { DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

const LogOut = () => {
  return (
    <button className={'flex items-center gap-3'}>
      <DynamicIcon iconId={'LogOut'} width={'24'} height={'24'} />
      <Typography variant={TypographyVariant.medium_text_14}>Log Out</Typography>
    </button>
  )
}

export default LogOut
