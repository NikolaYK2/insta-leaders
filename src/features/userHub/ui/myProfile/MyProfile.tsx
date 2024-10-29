import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import { useRouter } from 'next/router'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { MyPosts } from '@/features/userHub/ui/myProfile/myPosts/MyPosts'

export const MyProfile: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: userMe, isLoading: isLoadingUserMe, isError: isErrorUserMe } = useGetUsersMeQuery()
  // const {
  //   data: userPosts,
  //   isLoading: isLoadingUserPosts,
  //   isError: isErrorUserPosts,
  // } = useGetUsersPostsQuery()

  if (isLoadingUserMe) {
    return <div>Loading...</div>
  }

  const handlerClickRedirectSetting = () => {
    router.push(`${ROUTES_APP.PROFILE}${ROUTES_APP.PROFILE_SETTING}`)
  }

  const profileId = Number(router.query.id)

  if (isNaN(profileId)) {
    return <div>Invalid profile ID</div>
  }
  return (
    <Page
      titleMeta={'My Profile'}
      descriptionMeta={'View and edit your personal profile information'}
    >
      <section className={'flex justify-between flex-wrap mb-12'}>
        <div className={'max-w-[204px] h-[204px] w-full'}>
          <PhotoPreview image={userMe?.data.avatar ?? null} size={204} />
        </div>
        <div className={'w-full max-w-[730px]'}>
          <div className={'flex justify-between items-center mb-5'}>
            <Typography>{userMe?.data.userName ?? 'User name'}</Typography>
            {userMe?.data.id &&
              router.query.id &&
              userMe?.data.id === profileId && ( //являешься ли владельцем профиля
                <Button variant={'secondary'} onClick={handlerClickRedirectSetting}>
                  <Typography variant={TypographyVariant.h3}>Profile Settings</Typography>
                </Button>
              )}
          </div>

          <div className={'flex flex-row mb-7'}>
            <div className={'max-w-[159px] w-full mr-1'}>
              <Typography variant={TypographyVariant.bold_text_14}>2 218</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>Following</Typography>
            </div>
            <div className={'max-w-[139px] w-full mr-1'}>
              <Typography variant={TypographyVariant.bold_text_14}>2 358</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>Following</Typography>
            </div>
            <div className={''}>
              <Typography variant={TypographyVariant.bold_text_14}>2 764</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>Publications</Typography>
            </div>
          </div>

          <Typography variant={TypographyVariant.regular_text_16} className={''}>
            {userMe?.data.aboutMe ? (
              <>
                {userMe?.data.aboutMe}
                <Typography
                  asChild
                  variant={TypographyVariant.regular_link}
                  className={'cursor-pointer'}
                >
                  <span>span span span</span>
                </Typography>
              </>
            ) : (
              '...'
            )}
          </Typography>
        </div>
      </section>
      <MyPosts />
    </Page>
  )
}
