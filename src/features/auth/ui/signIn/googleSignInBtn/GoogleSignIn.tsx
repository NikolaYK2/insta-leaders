import React from 'react'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { LocalStorageUtils } from '@/utils/LocalStorageUtil'

export const GoogleSignIn = () => {
  const handleGoogleSignIn = () => {
    const client_id = '792546249106-u5of55jk4hus635kpd936g5968b62a1c.apps.googleusercontent.com'
    const redirect_uri = 'http://localhost:3001/google'

    const state = '50c45fc5314190fc5d117c09dc9ebadf'
    LocalStorageUtils.setValue('latestCSRFToken', state)
    // localStorage.setItem('latestCSRFToken', state)

    const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=code&scope=email profile&redirect_uri=${redirect_uri}&state=${state}`

    window.location.assign(link)
  }

  return (
    <Button variant={'text'} className={'p-1'} onClick={handleGoogleSignIn}>
      <DynamicIcon iconId={'GoogleSvgrepoCom1'} width={36} height={36} />
    </Button>
  )
}
