import RoomCard from "../RoomCard";
import getAllRooms from "../../utils/getAllRooms";
import { useEffect, useState } from "react";
import LoadingRoomCard from "../LoadingRoomCard";
import { auth } from "../../firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import UserBio from "./UserBio";
import SignOut from "../SignOut";
import { Navigate } from "react-router-dom";
const MainContent = ({ activeMenu }) => {
  const [rooms, setRooms] = useState(undefined);
  const [user, setUser] = useState(auth.currentUser.uid);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getAllRooms().then((rooms) => {
          //filter rooms where room user_id === user.uid
          const filteredRooms = rooms.filter(
            (room) => room.user_id === user.uid
          );
          setRooms(filteredRooms);
        });
      }
    });
  }, []);

  if (activeMenu === "Profile") {
    return <UserBio user={user} />;
  } else if (activeMenu === "Setting") {
    return <div>Setting Content</div>;
  } else if (activeMenu === "Logout") {
    window.location.replace("/logout");
  } else {
    return (
      <>
        <div className=" text-xl mt-4">Your Personal Seat Bookings </div>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mt-4 flex flex-col justify-center items-center gap-4 md:flex-row md:flex-wrap">
            {rooms ? (
              rooms.map((room) => {
                return (
                  <RoomCard
                    key={room.id}
                    roomId={room.id}
                    img_url={room.room_pic}
                    title={room.title}
                    description={room.description}
                    rating={room.rating}
                    availability={room.seatAvailability}
                    nextBookingIn={room.nextBookingIn}
                  />
                );
              })
            ) : (
              <>
                <LoadingRoomCard />
                <LoadingRoomCard />
                <LoadingRoomCard />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default MainContent;
