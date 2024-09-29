import {Action, combineSlices, configureStore, ThunkAction} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { instaLeadersApi } from '@/appRoot/services/instaLeadersApi'
import {forgotPasswordApi} from "@/features/auth/ui/forgotPassword/forgotPasswordApi";

const makeStore = () =>
  configureStore({
    // reducer: { [instaLeadersApi.reducerPath]: instaLeadersApi.reducer },
      reducer: combineSlices(instaLeadersApi, forgotPasswordApi),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(instaLeadersApi.middleware).concat(forgotPasswordApi.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
