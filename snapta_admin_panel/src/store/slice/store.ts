import { configureStore } from '@reduxjs/toolkit'
import { getAllPost } from '../api/AllPostList'
import { getAllReel } from '../api/AllReelList'
import { getAllPostReel } from '../api/AllPostsReels'
import { getAllTotal } from '../api/AllTotalDashboard'
import { getGrowth } from '../api/GetUserByMonthDashboard'
import { getMediaGraph } from '../api/MediaGraphDashboard'
import { getUserLogin } from '../api/UserLoginDashboard'
import { getPlatform } from '../api/PlatformDashboard'
import { getCountryWiseUser } from '../api/CountryWiseUserDashboard'
import { getAllSettings } from '../api/GetAllGeneralSettings'
import { getAllKey } from '../api/GetAllTwilioKey'
import { getAllMailSetup } from '../api/GetAllMailSetup'
import { getDetails } from '../api/GetProfileDetails'
import { getAllLanguage } from '../api/GetAllLanguage'
// import { getAllUsers } from '../api/AllUsersList'

export const store = configureStore({
  reducer: {
    [getAllPost.reducerPath]: getAllPost.reducer,
    [getAllReel.reducerPath]: getAllReel.reducer,
    [getAllPostReel.reducerPath]: getAllPostReel.reducer,
    [getAllTotal.reducerPath]:getAllTotal.reducer,
    [getGrowth.reducerPath]:getGrowth.reducer,
    [getMediaGraph.reducerPath]:getMediaGraph.reducer,
    [getUserLogin.reducerPath]:getUserLogin.reducer,
    [getPlatform.reducerPath]:getPlatform.reducer,
    [getCountryWiseUser.reducerPath]:getCountryWiseUser.reducer,
    [getAllSettings.reducerPath]:getAllSettings.reducer,
    [getAllKey.reducerPath]:getAllKey.reducer,
    [getAllMailSetup.reducerPath]:getAllMailSetup.reducer,
    [getDetails.reducerPath]:getDetails.reducer,
    [getAllLanguage.reducerPath]:getAllLanguage.reducer,
    // [getAllUsers.reducerPath]: getAllUsers.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(getAllPost.middleware)
    .concat(getAllReel.middleware)
    .concat(getAllPostReel.middleware)
    .concat(getAllTotal.middleware)
    .concat(getGrowth.middleware)
    .concat(getMediaGraph.middleware)
    .concat(getUserLogin.middleware)
    .concat(getPlatform.middleware)
    .concat(getCountryWiseUser.middleware)
    .concat(getAllSettings.middleware)
    .concat(getAllKey.middleware)
    .concat(getAllMailSetup.middleware)
    .concat(getDetails.middleware)
    .concat(getAllLanguage.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


