import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import { useRouter } from 'next/router'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'
import { PostsProfile } from '@/features/userHub/ui/myProfile/postsProfile/PostsProfile'
import { InfoProfile } from '@/features/userHub/ui/myProfile/infoProfile/InfoProfile'

export const MyProfile: NextPageWithLayout = () => {
  const router = useRouter()
  const profileId = Number(router.query.id)

  const { data, isLoading, isError } = useGetUsersMeQuery()

  const isOwner = data?.data.id === profileId

  if (isLoading) {
    return <div>Loading...</div>
  }
  const handlerClickRedirectSetting = () => {
    router.push(`${ROUTES_APP.PROFILE}${ROUTES_APP.PROFILE_SETTING}`)
  }

  if (isNaN(profileId)) {
    return <div>Invalid profile ID</div>
  }
  if (data?.data)
    return (
      <Page
        titleMeta={'My Profile'}
        descriptionMeta={'View and edit your personal profile information'}
      >
        <InfoProfile user={data.data} isOwner={isOwner} onEdit={handlerClickRedirectSetting} />

        {profileId && <PostsProfile profileId={profileId} />}
      </Page>
    )
}
