import { db } from "./FirebaseConfig";
import { get, ref, set } from "firebase/database";

export async function getUser(username) {
  return get(ref(db, `users/${username}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("get user", err);
    });
}

export async function postUser(username) {
  set(ref(db, `/users/${username}`), {
    username,
  });
}

export function getQuizes(username) {
  get(ref(db, `users/${username}/quizes`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("get quizes", err);
    });
}
