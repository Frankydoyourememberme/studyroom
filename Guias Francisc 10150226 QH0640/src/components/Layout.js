import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({isHome}) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
