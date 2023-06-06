import { auth } from "../firebaseInit";
import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Dashboard from "../components/admin/dashboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseInit";
export default function IsUserAdmin(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        user.providerData.forEach(async (profile) => {
          const docRef = doc(db, "users", "vGUBuSZomHCXHBeTOPOL");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            if (profile.email === docSnap.data().email) return <Dashboard />;
            else {
              alert("access denied !!");
              // Render an "Access denied" message if the user is not an admin
              return <div className="text-black">Access denied</div>;
            }
            console.log(profile.email === docSnap.data().email);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      } else if (!user) {
        // Redirect to login if the user is not logged in
        return <Navigate to="/login" />;
      } else {
        // Render an "Access denied" message if the user is not an admin
        return <div>Access denied</div>;
      }
    });
  }, []);

  return (
    <>
      {user? (<Dashboard/>) : (
        <div className="flex flex-col flex-1 justify-center items-center">
          <button type="button" className="bg-red text-white p-10" disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3"
              viewBox="0 0 24 24"
            ></svg>
            Authenticating...
          </button>
        </div>
      )}
    </>
  );
}
