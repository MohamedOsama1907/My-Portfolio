import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Contact from "./Pages/Contact/Contact";
import Projects from "./Pages/Projects/Projects";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner";

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
        path: "Projects",
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
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;
