import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Contact from "./Pages/Contact/Contact";
import Projects from "./Pages/Projects/Projects";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DocumentLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.resolvedLanguage === "ar";
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.resolvedLanguage]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "Projects",
        element: <Projects />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const { i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage === "ar";
  return (
    <ThemeProvider>
      <DocumentLanguage />
      <RouterProvider router={router} />
      <Toaster
        richColors
        dir={isArabic ? "rtl" : "ltr"}
        position={isArabic ? "top-left" : "top-right"}
      />
    </ThemeProvider>
  );
}

export default App;
