import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RoomCard from "../RoomCard";
import PrimaryButton from "../PrimaryButton";
import { db, storage } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import getAllRooms from "../../utils/getAllRooms";
import { Navigate } from "react-router-dom";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Add Room", href: "#", current: true },
  //   { name: "Setting", href: "#", current: false },
  { name: "Logout", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPic, setRoomPic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [rooms, setRooms] = useState(undefined);
  document.body.classList.add("h-full", "bg-gray-100");

  const allRooms = () => {
    getAllRooms().then((rooms) => {
      setRooms(rooms);
    });
  };

  useEffect(() => {
    allRooms();
  }, []);

  const uploadRoomPicture = () => {
    return new Promise((resolved, rejected) => {
      const roomPicRef = ref(
        storage,
        `room-pictures/${uuidv4()}-${roomPic.name}`
      );
      uploadBytes(roomPicRef, roomPic).then((snapshot) => {
        getDownloadURL(roomPicRef).then((url) => {
          resolved(url);
        });
      });
    });
  };

  const handleNewRoom = (event) => {
    event.preventDefault();
    setIsUploading(true);
    uploadRoomPicture().then(async (url) => {
      const docRef = await addDoc(collection(db, "rooms"), {
        title: title,
        description: description,
        roomType: roomType,
        nextBookingIn: "",
        rating: 5,
        seatAvailability: "YES",
        user_id: null,
        room_pic: url,
      });
      setIsUploading(false);
      alert("New Room added successfully.");
      allRooms();
    });
  };

  const handleOnLogoutClick = (itemName) => {
    if (itemName === "Logout") window.location.replace("/logout");
  };

  return (
    <>
      {/* DISPLAY ROOMS */}
      <div className="min-h-full flex">
        <Disclosure as="nav" className="bg-red h-screen w-auto  ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl ">
                <div className="flex flex-col h-16 justify-between">
                  <div className="flex flex-col">
                    <div className="hidden md:block">
                      <div className="flex flex-col pt-8 gap-6 p-3 mr-6 items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-black text-red"
                                : "text-gray-300 hover:bg-black hover:text-red",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => handleOnLogoutClick(item.name)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="flex flex-col flex-1">
          <header className="bg-white shadow bg-gradient-to-r from-red  ">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-black">
                Admin Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="mt-4 flex flex-col justify-center items-center gap-4 md:flex-row md:flex-wrap">
                <div className="flex flex-col">
                  {/* ADD ROOM FORM */}
                  <div className="mt-10 sm:mt-0">
                    <div className="flex flex-col">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            ADD NEW ROOM
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Fill in the following form then click Add Room
                            button.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                          <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="title"
                                    autoComplete="given-name"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="room_pic"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Select Room Picture
                                  </label>
                                  <input
                                    type="file"
                                    name="room_pic"
                                    id="room_pic"
                                    onChange={(e) =>
                                      setRoomPic(e.target.files[0])
                                    }
                                    autoComplete="room_pic"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                  <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Description
                                  </label>
                                  <textarea
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    id="description"
                                    autoComplete="description"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="roomType"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Room Type
                                  </label>
                                  <select
                                    id="roomType"
                                    name="roomType"
                                    value={roomType}
                                    onChange={(e) =>
                                      setRoomType(e.target.value)
                                    }
                                    autoComplete="roomType"
                                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  >
                                    <option>Silent Study Room</option>
                                    <option>Group Study Room</option>
                                    <option>Computer Lab</option>
                                    <option>Multimedia Room</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                              <PrimaryButton
                                isLoading={isUploading}
                                onClick={handleNewRoom}
                                type="submit"
                                text={"Add Room"}
                                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className=" md:ml-8 sm:block" aria-hidden="true">
            <div className="py-5">
              <h1 className=" text-4xl">Listed Rooms</h1>
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="flex flex-wrap md:ml-8 gap-3 md:mb-3">
            {rooms &&
              rooms.map((room) => {
                return (
                  <RoomCard
                    key={room.id}
                    img_url={room.room_pic}
                    title={room.title}
                    description={room.description}
                    rating={room.rating}
                    availability={room.seatAvailability}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
