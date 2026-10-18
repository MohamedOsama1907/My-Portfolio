import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SocialSidebar from "../SocialSidebar/SocialSidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[1920px] flex-col lg:flex-row lg:items-center">
        <SocialSidebar />
        <main className="mx-auto w-full min-w-0 max-w-[1380px] px-4 sm:px-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
