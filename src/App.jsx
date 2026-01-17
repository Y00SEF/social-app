import { createBrowserRouter, RouterProvider } from "react-router";

import { Bounce, ToastContainer as ToestContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import PostDetails from "./Components/PostDetails/PostDetails";
import ProtectedRoute from "./Components/ProtectRoute/ProtectedRoute";
import { PostsProvider } from "./Components/usePosts/UsePosts";
import { AuthContextProvider } from "./Context/Auth.context";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";

function App() {
  let route = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRoute>
          <Signup />
        </AuthRoute>
      ),
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/postinfo/:id",
      element: (
        <ProtectedRoute>
          <PostDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/changepassword",
      element: (
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <PostsProvider>
          <RouterProvider router={route}></RouterProvider>

          <ToestContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </PostsProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
