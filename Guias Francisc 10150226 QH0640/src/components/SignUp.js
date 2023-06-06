import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseInit";
import { setUserId } from "firebase/analytics";
import { Navigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
export default function SignUp() {
  document.body.style.backgroundImage = "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/profile");
    });
    return () => {
      unsub();
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update the user's profile with additional data
        updateProfile(auth.currentUser, {
            displayName: name,
            isAdmin: false,
            // photoURL: "https://example.com/profile.jpg",
          })
          .then(() => {
            // Profile updated successfully
            console.log("User profile updated");
          })
          .catch((error) => {
            // Failed to update profile
            console.error(error);
          });

        navigate("/profile");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="images/logo.png"
              alt="Solent University"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
              Register account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or continoue with{" "}
              {/* <a href="#" className="font-medium text-red hover:text-indigo-500">
                start your 14-day free trial
              </a> */}
              <br />
              <div className="flex flex-row gap-2 justify-center mt-4">
                <div className="fb-icon border rounded  pl-4 pr-4 pt-1 pb-1 hover:cursor-pointer">
                  <img className=" h-5" src="assets/icons/facebook.png" />
                </div>
                <div className="fb-icon border rounded  pl-4 pr-4 pt-1 pb-1 hover:cursor-pointer">
                  <img className=" h-5" src="assets/icons/twitter.png" />
                </div>
                <div className="fb-icon border rounded  pl-4 pr-4 pt-1 pb-1 hover:cursor-pointer">
                  <img className=" h-5" src="assets/icons/github.png" />
                </div>
              </div>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  name address
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="relative pl-2 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="relative pl-2 block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="relative pl-2 block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red focus:ring-black"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-black"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-medium text-red hover:text-black"
                >
                  Already have account? Login
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-red py-2 px-3 text-sm font-semibold text-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white group-hover:text-black"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
