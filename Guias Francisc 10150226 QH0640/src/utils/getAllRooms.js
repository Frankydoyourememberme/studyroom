import { db } from "../firebaseInit";
import { doc, getDocs, collection } from "firebase/firestore";

export default function getAllRooms() {
  return new Promise(async (resolved, rejected) => {
    const collectionRef = collection(db, "rooms");
    const collectionSnap = await getDocs(collectionRef);
    let allRooms = [];
    collectionSnap.forEach((room) => {
      allRooms.push({ id: room.id, ...room.data() });
    });
    resolved(allRooms);
  });
}
