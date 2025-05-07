import {
  getConnectionQuestions,
  getImageQuestions,
  getMusicQuestions,
  getSequenceQuestions,
  getVowelsQuestions,
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
