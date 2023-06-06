import { auth } from "../firebaseInit";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function SignOut() {
  const navigate = useNavigate();

  signOut(auth).then(() => {
    console.log('sign out...')
    navigate("/");
  });
}
