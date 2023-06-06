import "../css/cardStyle.css";
import { Link } from "react-router-dom";
export default function AvailableRoomsCard() {
  return (
    <>
      <main className="mt-16 md:mt-0 md:content-start md:items-start ">
        <div className="card pt-8 pl-8 ml-auto text-white mr-10">
          <div className="card-content">
            <h2 className="font-bold">Available Study Rooms</h2>
            <p className="text-white mt-4 text-xs">
              Pick a room to book your seat
            </p>
            <div className="mt-8 flex flex-col gap-14">
              <Link to="/book-room">
                <div className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-red rounded-md w-64 text-justify">
                  <img src="images/book.png" className="room-image h-16 w-16" />
                  <div className="room-content">
                    <div className="room-title font-bold">
                      Silent Study Room
                    </div>
                    <div className="room-description text-xs">
                      Perfect for individual studying
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/book-room">
                <div className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-red rounded-md w-64 text-justify">
                  <img src="images/book.png" className="room-image h-16 w-16" />
                  <div className="room-content">
                    <div className="room-title font-bold">Group Study Room</div>
                    <div className="room-description text-xs">
                      Ideal for collaborative studying
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/book-room">
                <div className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-red rounded-md w-64 text-justify">
                  <img src="images/book.png" className="room-image h-16 w-16" />
                  <div className="room-content">
                    <div className="room-title font-bold">Computer Lab</div>
                    <div className="room-description text-xs">
                      Equipped with computers
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/book-room">
                <div className="flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-red rounded-md w-64 text-justify">
                  <img src="images/book.png" className="room-image h-16 w-16" />
                  <div className="room-content">
                    <div className="room-title font-bold">Multimedia Room</div>
                    <div className="room-description text-xs">
                      Have Microphones and cameras
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
