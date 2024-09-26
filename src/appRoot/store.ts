import { Action, combineSlices, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import { loginApi } from '@/features/auth/ui/signIn/SignInForm/LoginAPI'

const makeStore = () =>
  configureStore({
    // reducer: { [instaLeadersApi.reducerPath]: instaLeadersApi.reducer },
    reducer: combineSlices(instaLeadersApi, loginApi),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(instaLeadersApi.middleware).concat(loginApi.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
