import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import RootLayout from "./RootLayout";
import Inbox from "./Components/Inbox";
import Sent from "./Components/Sent";
import { useSelector } from "react-redux";

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
      ],
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
