import {
  getConnectionQuestions,
  getImageQuestions,
  getMusicQuestions,
  getSequenceQuestions,
  getVowelsQuestions,
  updateConnectionQuestions,
  updateImageQuestions,
  updateMusicQuestions,
  updateQuizName,
  updateSequenceQuestions,
  updateVowelQuestions,
} from "./api";

export async function getAllQuestions(quizId) {
  const promiseArr = [];

  promiseArr.push(getConnectionQuestions(quizId));
  promiseArr.push(getSequenceQuestions(quizId));
  promiseArr.push(getMusicQuestions(quizId));
  promiseArr.push(getImageQuestions(quizId));
  promiseArr.push(getVowelsQuestions(quizId));

  return Promise.all(promiseArr).then(
    ([connections, sequence, music, image, vowels]) => {
      return { connections, sequence, music, image, vowels };
    }
  );
}

export async function updateAllQuestions(quizId, questions, newName) {
  const { connections, sequence, image, music, vowels } = questions;
  const promiseArr = [];

  connections.forEach((question) => {
    promiseArr.push(updateConnectionQuestions(quizId, question));
  });
  sequence.forEach((question) => {
    promiseArr.push(updateSequenceQuestions(quizId, question));
  });
  image.forEach((question) => {
    promiseArr.push(updateImageQuestions(quizId, question));
  });
  music.forEach((question) => {
    promiseArr.push(updateMusicQuestions(quizId, question));
  });
  vowels.forEach((question) => {
    promiseArr.push(updateVowelQuestions(quizId, question));
  });
  promiseArr.push(updateQuizName(quizId, newName));

  return Promise.all(promiseArr)
    .then((response) => {
      const success = response.every((status) => {
        return status === 200;
      });

      return success
        ? { status: 200 }
        : { status: 500, msg: "something went wrong" };
    })
    .catch((err) => {
      console.log(err);
    });
}
