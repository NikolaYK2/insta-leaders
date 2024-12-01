import React, { useState } from 'react'
import Image from 'next/image'
import { useGetsPostsByUsernameQuery } from '@/features/userHub/api/post/postService'
import {
  DropDownMenu,
  ItemSetting,
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '@nikolajk2/lib-insta-leaders'
import { PostItem } from '@/features/userHub/api/post/postServiceType'
import { DeletePostModal } from '@/features/userHub/ui/deletePost/DeletePostModal'

type Props = {
  userName: string
}
export const PostsProfile = ({ userName }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [post, setPost] = useState<PostItem>({} as PostItem)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const dropDownItems: ItemSetting[] = [
    { title: 'EditPost', disabled: false, icon: 'Edit2', onClick: () => alert('click') },
    {
      title: 'DeletePost',
      disabled: false,
      icon: 'TrashOutline',
      onClick: () => setIsOpenDeleteModal(true),
    },
  ]

  const { data, isLoading, isError } = useGetsPostsByUsernameQuery(userName)
  if (isLoading) return <>Загрузка постов....</>

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <div className={'flex flex-wrap gap-3'}>
        {data?.items
          ? data.items.map((item: PostItem) => (
              <ModalTrigger key={item.id} className={'flex-[0_1_234px] h-[228px]'}>
                <Image
                  src={item.images[0].url}
                  alt={`Picture of ${item.id}`}
                  width={234}
                  height={228}
                  onClick={() => setPost(item)}
                  className={'h-[100%]  object-cover object-center'}
                />
              </ModalTrigger>
            ))
          : 'Нет постов'}
      </div>

      <ModalContent className={'flex max-w-[972px] h-[600px] border border-dark-100 z-0'}>
        <div className={'w-3/6'}>
          <Image
            className={'h-[100%]  object-cover object-center'}
            src={post.images ? post.images[0].url : ''}
            alt=""
            width={1000}
            height={1000}
            key={post.id}
          />
        </div>
        <div className={'w-3/6 flex:[1_1_50%] bg-dark-300'}>
          <ModalTitle className={'flex justify-between'}>
            <div className={'flex  items-center'}>
              <div className={'w-9 h-9 bg-white rounded-full'}></div>
              {post.userName}
            </div>
            <div className={'flex  items-center'}>
              <DropDownMenu trigger={{ icon: 'MoreHorizontal' }} items={dropDownItems} />
              <DeletePostModal
                isOpen={isOpenDeleteModal}
                setIsOpen={setIsOpenDeleteModal}
                postId={post.id}
                closeModal={() => setIsOpen(false)}
              />
            </div>
          </ModalTitle>
          <ModalDescription />
          Comments
        </div>
      </ModalContent>
    </Modal>
  )
}
