import React from 'react'
import { HeadersMeta } from '@/common/components'
import { cn } from '@/common/utils/cn'

type PageProps = {
  titleMeta: string
  descriptionMeta?: string
  className?: string
  children: React.ReactNode
}
export const Page = ({ titleMeta, descriptionMeta, className, children }: PageProps) => {
  return (
    <section className={cn('pt-[36px] pl-[24px]', className)}>
      <HeadersMeta title={titleMeta} description={descriptionMeta} />
      {children}
    </section>
  )
}
