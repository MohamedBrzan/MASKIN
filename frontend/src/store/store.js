import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import BlogApi from './apis/Blog';
import ProfileApi from './apis/User/Profile';
import MyRealStatesApi from './apis/User/MyRealStates';
import RealStateApi from './apis/RealState';
import UserApi from './apis/User/GetUserById';
import AuthReducer from './reducers/Authentication/AuthReducer';
import SettingsReducer from './reducers/User/Settings/SettingsReducer';
import MyBlogsApi from './apis/User/Blog/MyBlogs';
import MyMessagesApi from './apis/User/MyMessages';
import AdApi from './apis/Ad/Ad';
import AdExpireApi from './apis/Ad/AdExpire';
import MyReviewsApi from './apis/User/MyReviews';

const store = configureStore({
  reducer: {
    updateUser: SettingsReducer,
    auth: AuthReducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [MyRealStatesApi.reducerPath]: MyRealStatesApi.reducer,
    [MyBlogsApi.reducerPath]: MyBlogsApi.reducer,
    [RealStateApi.reducerPath]: RealStateApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [MyMessagesApi.reducerPath]: MyMessagesApi.reducer,
    [MyReviewsApi.reducerPath]: MyReviewsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [AdApi.reducerPath]: AdApi.reducer,
    [AdExpireApi.reducerPath]: AdExpireApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      RealStateApi.middleware,
      BlogApi.middleware,
      UserApi.middleware,
      MyRealStatesApi.middleware,
      MyBlogsApi.middleware,
      MyMessagesApi.middleware,
      MyReviewsApi.middleware,
      ProfileApi.middleware,
      AdApi.middleware,
      AdExpireApi.middleware
    ),
});

export default store;
setupListeners(store.dispatch);
