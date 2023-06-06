import RoomCard from "./RoomCard";
import getAllRooms from "../utils/getAllRooms";
import { useState, useEffect } from "react";
import LoadingRoomCard from "./LoadingRoomCard";
export default function AvailableRooms() {
  const [rooms, setRooms] = useState(undefined);

  document.body.style.backgroundImage = "";

  useEffect(() => {
    getAllRooms().then((rooms) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div
          className="banner-wrapper pt-28 bg-cover text-red md:p-28"
          style={{
            backgroundImage: `url("images/available-rooms.jpg")`,
          }}
        ></div>
        <div className=" ml-6 mr-4 mt-4 text-center text-4xl mb-8">
          <div className=" md:ml-8 sm:block" aria-hidden="true">
            <div className="py-5">
              <h1 className=" text-4xl">Choose a Room</h1>
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </div>
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
