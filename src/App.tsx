import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./styles/global.scss";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import FormPage from "./pages/FormPage";
import DashBoardPage from "./pages/DashBoardPage";
import BusinessPage from "./pages/BusinessPage";
import BusinessResultPage from "./pages/BusinessResultPage";
import BusinessDetailPage from "./pages/BusinessDetailPage";
import DocumentPage from "./pages/DocumentPage";
import NotFoundPage from "./pages/NotFoundPage";
import FormIntroPage from "./pages/FormIntroPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/main" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "main", element: <MainPage /> },
      { path: "form-intro", element: <FormIntroPage /> },
      { path: "form", element: <FormPage /> },
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "business", element: <BusinessPage /> },
      { path: "business/result", element: <BusinessResultPage /> },
      { path: "business/detail/:id", element: <BusinessDetailPage /> },
      { path: "document", element: <DocumentPage /> },
      { path: "*", element: <NotFoundPage /> }, // 404 처리
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
