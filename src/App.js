import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Welcome from "./Components/Welcome";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/forgetPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
