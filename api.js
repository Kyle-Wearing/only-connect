import axios from "axios";
import bcrypt from "bcryptjs";

const api = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/onlyconnect/api/",

  timeout: 5000,
});

async function hashPasswords(password) {
  const hash = await bcrypt.hash(password, 13);
  return hash;
}

export async function logIn({ name, password }) {
  return api
    .post("/login", {
      username: name,
    })
    .then((response) => {
      return Promise.all([
        bcrypt.compare(password, response.headers.password),
        response.headers.user_id,
      ]);
    })
    .then(([passwordCorrect, userId]) => {
      return passwordCorrect
        ? { status: 200, userId }
        : { status: 400, msg: "Invalid Password" };
    })
    .catch((err) => {
      console.log(err);
      return { status: 404, msg: "Invalid Username" };
    });
}

export async function signUp({ name, password }) {
  const hashedPassword = await hashPasswords(password);
  return api
    .post("/users", {
      username: name,
      password: hashedPassword,
    })
    .then((response) => {
      return { user_id: response.headers.user_id, status: response.status };
    })
    .catch((err) => {
      console.log(err);
      return { status: err.response.status };
    });
}

export async function getQuizzes() {
  return api
    .get("/quizzes")
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getQuizzesByUserId(userId) {
  return api
    .get(`/users/quizzes/${userId}`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getQuizByQuizId(quizId) {
  return api
    .get(`/quizzes/${quizId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
