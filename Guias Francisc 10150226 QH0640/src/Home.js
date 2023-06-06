import "./App.css";
import { useEffect } from "react";
import PrimaryButton from "./components/PrimaryButton";
import AvailableRoomsCard from "./components/AvailableRoomsCard";
import { Link, useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.backgroundImage = 'url("images/home-background.jpg")';
      document.body.classList.add("bg-cover", "h-screen", "bg-no-repeat");
    }
  });
  return (
    <>
      <div className="ml-4 mr-4 mt-16 md:ml-16 md:flex content-between ">
        <div className="hero-typography-wrapper w-56 flex flex-col gap-4 md:mt-44">
          <div className="hero-heading text-2xl md:text-4xl text-black font-bold">
            Book a
            <br />
            Study Room
          </div>
          <div className="hero-description prose text-sm text-black">
            <p className="hero-description text-justify">
              Discover and book available study rooms on Solent University's.
              Use our search function to find study rooms by time and
              availability.{" "}
              <p>
                {" "}
                Reserve a study room in advance and receive confirmation of your
                booking.
              </p>
            </p>
          </div>
          <div>
            <Link to="/book-room">
              <PrimaryButton text={"Book a Room"} />
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <AvailableRoomsCard />
        </div>
      </div>
    </>
  );
}

export default Home;
