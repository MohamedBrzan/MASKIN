import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
const Login = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));
const Interface = lazy(() => import('../interface/Interface'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const CreateBlogForm = lazy(() =>
  import('../pages/Blog/Creation/CreateBlogForm')
);
const BlogDetails = lazy(() =>
  import('../pages/Blog/helpers/BlogDetails/BlogDetails')
);
const ContactUs = lazy(() => import('../pages/ContactUs/ContactUs'));
const MyMessages = lazy(() => import('../pages/Profile/helpers/MyMessages'));
const MyBlogs = lazy(() => import('../pages/Profile/helpers/MyBlogs'));
const MyRealStates = lazy(() =>
  import('../pages/Profile/helpers/MyRealStates')
);
const Settings = lazy(() => import('../pages/Profile/helpers/Settings'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const CreateRealStateForm = lazy(() =>
  import('../pages/RealState/Creation/CreateRealStateForm')
);
const RealStateDetails = lazy(() =>
  import('../pages/RealState/RealStateDetails/RealStateDetails')
);
const RealState = lazy(() => import('../pages/RealState/RealState'));
const UpdateBlogForm = lazy(() =>
  import('../pages/Blog/Creation/UpdateBlogForm')
);
const UpdateRealStateForm = lazy(() =>
  import('../pages/RealState/Creation/UpdateRealStateForm')
);
const AdPromotion = lazy(() => import('../pages/Ad/AdPromotion'));
const MyRealStatesFavorites = lazy(() =>
  import('../pages/Profile/helpers/MyRealStatesFavorites')
);
const UserPage = lazy(() => import('../pages/User/UserPage'));
const MyReviews = lazy(() => import('../pages/Profile/helpers/MyReviews'));
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const NotFound = lazy(() => import('../error/NotFound'));

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Interface />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='user/:id' element={<UserPage />} />

        {user && (
          <Route path='me/'>
            <Route index element={<Profile />} />
            <Route path='messages' element={<MyMessages />} />
            <Route path='real-states' element={<MyRealStates />} />
            <Route path='blogs/create' element={<CreateBlogForm />} />
            <Route path='real-states/reviews' element={<MyReviews />} />

            <Route path='blogs/:id/update' element={<UpdateBlogForm />} />

            <Route
              path='real-states/create'
              element={<CreateRealStateForm />}
            />

            <Route
              path='real-states/:id/update'
              element={<UpdateRealStateForm />}
            />
            <Route
              path='real-states/favorite'
              element={<MyRealStatesFavorites />}
            />

            <Route path='blogs' element={<MyBlogs />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        )}

        {user && <Route path='ad/create' element={<AdPromotion />} />}
        <Route path='blog/:id' element={<BlogDetails />} />
        <Route path='blog' element={<Blog />} />

        {/* <Route path='/' element={<Layout />} /> */}
        <Route path='real-state' element={<RealState />} />
        <Route path='real-state/:id' element={<RealStateDetails />} />

        {!user && (
          <>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route
              path='reset-password/:id/:token'
              element={<ResetPassword />}
            />
          </>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
