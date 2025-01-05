import { db } from "./FirebaseConfig";
import { get, push, ref, set } from "firebase/database";

export async function getUser(username) {
  return get(ref(db, `users/${username}/username`))
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
  return get(ref(db, `users/${username}/quizes`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("get quizes", err);
    });
}

export function postQuiz(quiz, username, title) {
  const postRef = ref(db, `users/${username}/quizes`);
  const newPostRef = push(postRef);
  set(newPostRef, { [title]: quiz });
}
