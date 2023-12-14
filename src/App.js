import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import RootLayout from "./RootLayout";
import Inbox from "./Components/Inbox";
import Sent from "./Components/Sent";
import { useSelector } from "react-redux";
import WriteEmail from "./Components/WriteEmail";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
  const routes = createBrowserRouter([
    {
      path: "/forgetPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: isLoggedIn && <Inbox />,
        },

        {
          path: "/sent",
          element: isLoggedIn && <Sent />,
        },
        {
          path: "/writemail",
          element: isLoggedIn && <WriteEmail />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <div>
          <h1>Page Not Found</h1>
          <Link to="/"> Go to Login Page</Link>
        </div>
      ),
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
