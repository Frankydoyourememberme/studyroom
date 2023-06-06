import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RoomCard from "../RoomCard";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import { findAllByTestId } from "@testing-library/react";
import MainContent from "./MainContent";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Seat Bookings", href: "#Seat-Bookings", current: true },
  { name: "Profile", href: "#", current: false },
  // { name: "Setting", href: "#Setting", current: false },
  { name: "Logout", href: "#Logout", current: false },
];
const userNavigation = [
  { name: "Seat Bookings", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  // { name: "Settings", href: "#", current: false },
  { name: "Sign out", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [activeMenu, setActiveMenu] = useState("Seat Bookings");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    };

    const navigationWithActiveState = navigation.map((item) => {
      return {
        ...item,
        current: item.name === activeMenu,
      };
    });
  document.body.style.backgroundImage = "";

  document.body.classList.add("h-full", "bg-gray-100");
  return (
    <>
      <div className="min-h-full flex">
        <Disclosure as="nav" className="bg-red h-screen w-auto">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl ">
                <div className="flex flex-col h-16 justify-between">
                  <div className="flex flex-col">
                    <div className="hidden md:block">
                      <div className="flex flex-col pt-8 p-3 mr-6 md:gap-4 items-baseline space-x-4">
                        {navigationWithActiveState.map((item) => (
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
                            onClick={()=>handleMenuClick(item.name)}
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
          <header className="bg-white shadow bg-gradient-to-r from-red">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-black">
                {/* page header - heading */}
                {activeMenu}
              </h1>
            </div>
          </header>
          <main>
            {/* main page content-area */}
          <MainContent activeMenu={activeMenu} />
          </main>
        </div>
      </div>
    </>
  );
}
