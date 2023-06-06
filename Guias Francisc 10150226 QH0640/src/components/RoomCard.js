import "../css/cardStyle.css";
import PrimaryButton from "./PrimaryButton";
import { db } from "../firebaseInit";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebaseInit";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
export default function RoomCard(props) {
  const [userId, setUserId] = useState();
  const [availabilityStatus, setAvailabilityStatus] = useState(
    props.availability
  );
  const [remainingTime, setRemainingTime] = useState(props.nextBookingIn);
  const [isLoading, setIsLoading] = useState(false);

  const nextBookingTime = new Date(props.nextBookingIn);
  // console.log('nextbooking: ', props.nextBookingIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    // setting countdown/remaining time for next booking
    // const nextBookingIn = props.nextBookingIn ? props.nextBookingIn : 0;

    const currentTime = new Date().getTime();
    const bookingTime = props.nextBookingIn;
    const elapsedTimeInSeconds = Math.floor((currentTime - bookingTime) / 1000);
    const timeLeftInSeconds = 4 * 60 * 60 - elapsedTimeInSeconds;

    // console.log("time: ", timeLeftInSeconds);
    setRemainingTime(timeLeftInSeconds);
    setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
  }, []);

  // function to handle room booking
  // only allow the booking if the room is not booked or 30 minutes left before current booking end
  const handleRoomBooking = () => {
    setIsLoading(true);

    if (userId) {
      const roomRef = doc(db, "rooms", props.roomId);
      if (availabilityStatus === "YES" || remainingTime <= 0) {
        updateDoc(roomRef, {
          seatAvailability: "NO",
          user_id: userId,
          nextBookingIn: new Date().getTime(),
        }).then(() => {
          setAvailabilityStatus("NO");
          setRemainingTime(14400); // 4 hours in seconds
          setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
          }, 1000);
        });
      } else if (remainingTime > 0 && remainingTime <= 1800) {
        updateDoc(roomRef, {
          seatAvailability: "NO",
          user_id: userId,
          nextBookingIn: new Date().getTime(),
        }).then(() => {
          setAvailabilityStatus("NO");
          setRemainingTime(14400); // 4 hours in seconds
          setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
          }, 1000);
        });
      }
    } else {
      setIsLoading(false);

      Navigate("/login");
    }
    setIsLoading(false);
  };

  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <>
      <main className="">
        <div
          className="card text-white bg-contain relative"
          style={{
            backgroundImage: `url(${props.img_url})`,
            width: "20rem",
            height: "15rem",
          }}
        >
          <div className="card-content flex flex-col justify-center content-between pl-6 absolute gap-6 bg-gradient-to-r from-black overflow-hidden ">
            <div className="mt-8 flex flex-col gap-14">
              <div className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-red rounded-md w-64 text-justify">
                <div className="room-content">
                  <div className="room-title font-bold">{props.title}</div>
                  <div className="room-description text-xs">
                    {props.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="availability">
              <div className=" flex gap-2">
                Seat Available:
                <span className=" font-bold">
                  {" "}
                  {availabilityStatus === "NO" ? "BOOKED" : availabilityStatus}
                </span>
              </div>
            </div>
            {availabilityStatus === "NO" && (
              <div className="availability">
                <div className=" flex gap-2">
                  Next Booking In:
                  <span className="font-bold">
                    {" "}
                    {formatTime(remainingTime)}
                  </span>
                </div>
              </div>
            )}
            <div className="rating">
              <div className=" flex gap-2">
                <img className=" h-6" src="assets/icons/star.png" />
                <span className="font-bold"> {props.rating}</span>
              </div>
            </div>
            <div className="join-now mb-4">
              <PrimaryButton
                text={"Book Now"}
                onClick={handleRoomBooking}
                isLoading={isLoading}
                disabled={availabilityStatus === "NO" ? true : false}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
