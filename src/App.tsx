import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./styles/global.scss";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import FormPage from "./pages/FormPage";
import ReportPage from "./pages/reportPage/ReportPage";
import BusinessPage from "./pages/businessPage/BusinessPage";
import DocumentPage from "./pages/documentPage/DocumentPage";
import BusinessResultPage from "./pages/businessResultPage/BusinessResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import FormIntroPage from "./pages/FormIntroPage";
import DocumentIntroPage from "./pages/DocumentIntroPage";

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
      { path: "report", element: <ReportPage /> },
      { path: "business", element: <BusinessPage /> },
      { path: "business/result", element: <BusinessResultPage /> },
      { path: "document-intro", element: <DocumentIntroPage /> },
      { path: "document", element: <DocumentPage /> },
      { path: "*", element: <NotFoundPage /> }, // 404 처리
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
