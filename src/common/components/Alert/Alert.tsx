import React, { useEffect, useState } from 'react'
import { Toast } from '@nikolajk2/lib-insta-leaders'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/appRoot/store'
import { AlertState, hiddenAlert } from '@/appRoot/app.slice'

type Props = {
  ms?: number
  className?: string
}

export const Alert = ({ className, ms = 3000 }: Props) => {
  const { message, variant } = useSelector((state: AppState): AlertState => state.alert)
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (message) {
      setIsShow(true)
      const timerId = setTimeout(() => {
        setIsShow(false)
        dispatch(hiddenAlert())
      }, ms)

      return () => clearTimeout(timerId)
    }
  }, [message, variant, ms, dispatch])
  const handleClose = () => {
    setIsShow(false)
    dispatch(hiddenAlert())
  }
  if (!message) return null

  return (
    <div className={`${isShow ? 'block' : 'hidden'} absolute bottom-6 left-[173px] z-50`}>
      <Toast variant={variant} callback={handleClose} maxWidth={'auto'}>
        {message}
      </Toast>
    </div>
  )
}