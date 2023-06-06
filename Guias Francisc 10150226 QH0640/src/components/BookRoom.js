import "../css/cardStyle.css";
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import getAllRooms from "../utils/getAllRooms";
import RoomCard from "./RoomCard";
import LoadingRoomCard from "./LoadingRoomCard";

export default function BookRoom() {
  const [roomType, setRoomType] = useState();
  const [rooms, setRooms] = useState();

  document.body.style.backgroundImage = "";

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleOnSearchClick = () => {
    getAllRooms().then((rooms) => {
      //filter rooms according to user searched query
      const filteredRooms = rooms.filter((room) => room.title === roomType);
      setRooms(filteredRooms);
    });
  };

  return (
    <>
      <main className="mt-16 md:mt-10">
        <div
          className="card pt-8 text-white justify-center items-center text-center"
          style={{ height: "30rem" }}
        >
          <div className="card-content flex-col ">
            <h2 className="font-bold">FIND SUITABLE ROOM FOR STUDY</h2>
            <p className="text-white mt-4 text-xs text-center">
              Filter by Room type & timing
            </p>
            <div className="mt-8 flex flex-col gap-14 items-center justify-center ">
              <div className="flex flex-col gap-2 items-center hover:cursor-pointer rounded-md">
                <div className="room-content">
                  <div className="room-title font-bold">Select Room Type</div>
                  <div className="room-description text-xs text-black">
                    <select
                      className="p-2"
                      name="roomType"
                      id="room_type"
                      onClick={handleRoomTypeChange}
                    >
                      <option>Silent Study Room</option>
                      <option>Group Study Room</option>
                      <option>Computer Lab</option>
                      <option>Multimedia Room</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center hover:cursor-pointer rounded-md w-64 text-center">
                <div className="room-content flex flex-col ">
                  <div className="room-title font-bold">
                    Available Monday to Friday
                  </div>
                  Select timing
                  <div className="room-description text-xs">
                    <input type="date" name="date" className="p-2 text-black" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center hover:cursor-pointer rounded-md w-64 text-center">
                <div className="room-content flex flex-col">
                  <div className="room-description text-xs">
                    <PrimaryButton text={"Search Rooms"} onClick={handleOnSearchClick}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="flex flex-col justify-center items-center mt-8">
        {rooms ? (
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
        ) : (
          <>
            <span className=" text-xl text-gray-400">
              Search result is empty
            </span>
          </>
        )}
      </div>
    </>
  );
}
