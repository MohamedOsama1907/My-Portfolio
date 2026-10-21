import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SocialSidebar, { MobileSocialMenu } from "../SocialSidebar/SocialSidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[1920px] flex-col lg:flex-row lg:items-center mt-6 lg:mt-18">
        <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
          <SocialSidebar />
        </div>
        <main className="lg:pl-[100px] mx-auto w-full min-w-0 max-w-[1180px] px-6">
          <Outlet />
        </main>
      </div>
      <MobileSocialMenu />
      <Footer />
    </>
  );
}
