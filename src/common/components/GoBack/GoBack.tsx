import React from 'react'
import { Button, Typography } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

type GoBackProps = {
  backTo?: string
}
export const GoBack = ({ backTo }: GoBackProps) => {
  return (
    <Button>
      <Link href={}>
        <Typography>Back to {backTo}</Typography>
      </Link>
    </Button>
  )
}
