import React from 'react'
import { HeadersMeta } from '@/common/components'
import { useSearchParams } from 'next/navigation'

function Google() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  //   здесь должен быть запрс на авторизацию через google

  return (
    <div>
      <HeadersMeta title={'Google auth'} description={'Test page for google auth'} />
      <div>test</div>
      <div>{code}</div>
      <div>{state}</div>
    </div>
  )
}

export default Google
