import { Outlet, useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Error404, Loading, ScrollToTop } from "../components";
import LandingPage from "../layout/landing";
import { LandingUserView, LandingView } from "../section/landing/view";
import AuthenView from "../section/authen/view/AuthenView";
import { SignupView } from "../section/authen/view";
import LandingPageUser from "../layout";
import RoomName from "../section/room/roomName";
import PrivateRoute from "../components/PrivateRoute"; // Đảm bảo đường dẫn đúng

export const UserManage = lazy(() => import("../pages/UserManage"));
export const Authentication = lazy(() => import("../pages/Authentication"));
export const PaymentPage = lazy(() => import("../pages/PaymentPage"));
export const RulesPage = lazy(() => import("../pages/RulesPage"));
export const ContactPage = lazy(() => import("../pages/ContactPage"));
export const ContactUsPage = lazy(() => import("../pages/ContactUsPage"));
export const BlogPage = lazy(() => import("../pages/BlogPage"));
export const RoomPage = lazy(() => import("../pages/RoomPage"));
export const HomePage = lazy(() => import("../pages/HomePage"));

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <LandingPage>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </LandingPage>
      ),
      children: [
        {
          path: "/",
          element: <LandingView />,
        },
        {
          path: "/login",
          element: <AuthenView />,
        },
        {
          path: "/sign-up",
          element: <SignupView />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
    {
      path: "/user",
      element: (
        <PrivateRoute>
          <LandingPageUser>
            <ScrollToTop>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ScrollToTop>
          </LandingPageUser>
        </PrivateRoute>
      ),
      children: [
        {
          path: "/user",
          element: <LandingUserView />,
        },
        {
          path: "/user/home",
          element: <HomePage />,
        },
        {
          path: "/user/payment/:planName",
          element: <PaymentPage />,
        },
        {
          path: "/user/rules",
          element: <RulesPage />,
        },
        {
          path: "/user/contact",
          element: <ContactPage />,
        },
        {
          path: "/user/contact-us",
          element: <ContactUsPage />,
        },
        {
          path: "/user/blog",
          element: <BlogPage />,
        },
        {
          path: "/user/room",
          element: <RoomPage />,
        },
        {
          path: "/user/room/:roomName",
          element: <RoomName />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ]);

  return routes;
};
