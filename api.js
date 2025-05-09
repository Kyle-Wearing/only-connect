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

export async function getSequenceQuestions(quizId) {
  return api
    .get(`/quizzes/${quizId}/sequence`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getConnectionQuestions(quizId) {
  return api
    .get(`/quizzes/${quizId}/connections`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getImageQuestions(quizId) {
  return api
    .get(`/quizzes/${quizId}/images`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getMusicQuestions(quizId) {
  return api
    .get(`/quizzes/${quizId}/music`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getVowelsQuestions(quizId) {
  return api
    .get(`/quizzes/${quizId}/missing-vowels`)
    .then((response) => {
      return response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateConnectionQuestions(quizId, question) {
  const { clue_1, clue_2, clue_3, clue_4, answer, question_id } = question;
  return api
    .put(`/quizzes/${quizId}/connections`, {
      clue_1,
      clue_2,
      clue_3,
      clue_4,
      answer,
      question_id,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateSequenceQuestions(quizId, question) {
  const { clue_1, clue_2, clue_3, clue_4, answer, question_id } = question;
  return api
    .put(`/quizzes/${quizId}/sequence`, {
      clue_1,
      clue_2,
      clue_3,
      clue_4,
      answer,
      question_id,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateImageQuestions(quizId, question) {
  const { clue_1, clue_2, clue_3, clue_4, answer, question_id } = question;
  return api
    .put(`/quizzes/${quizId}/images`, {
      clue_1,
      clue_2,
      clue_3,
      clue_4,
      answer,
      question_id,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateMusicQuestions(quizId, question) {
  const {
    clue_1_url,
    clue_1_start,
    clue_1_duration,
    clue_2_url,
    clue_2_start,
    clue_2_duration,
    clue_3_url,
    clue_3_start,
    clue_3_duration,
    clue_4_url,
    clue_4_start,
    clue_4_duration,
    answer,
    question_id,
  } = question;
  return api
    .put(`/quizzes/${quizId}/music`, {
      clue_1_url,
      clue_1_start,
      clue_1_duration,
      clue_2_url,
      clue_2_start,
      clue_2_duration,
      clue_3_url,
      clue_3_start,
      clue_3_duration,
      clue_4_url,
      clue_4_start,
      clue_4_duration,
      answer,
      question_id,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateVowelQuestions(quizId, question) {
  const { answer, question_id } = question;
  return api
    .put(`/quizzes/${quizId}/missing-vowels`, {
      answer,
      question_id,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateQuizName(quizId, newName) {
  return api
    .put(`/quizzes`, {
      quiz_id: quizId,
      quiz_name: newName,
    })
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      console.log(err);
    });
}
