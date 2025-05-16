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

export function embedYoutubeUrls(questions) {
  const embededUrls = questions.map((question) => {
    let clue_1 = null;
    let clue_2 = null;
    let clue_3 = null;
    let clue_4 = null;

    if (question.clue_1_url) {
      clue_1 = `https://www.youtube.com/embed/${
        question.clue_1_url.split("/")[3]
      }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
        question.clue_1_start
      }&amp;autoplay=1`;
    }

    if (question.clue_2_url) {
      clue_2 = `https://www.youtube.com/embed/${
        question.clue_2_url.split("/")[3]
      }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
        question.clue_2_start
      }&amp;autoplay=1`;
    }

    if (question.clue_3_url) {
      clue_3 = `https://www.youtube.com/embed/${
        question.clue_3_url.split("/")[3]
      }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
        question.clue_3_start
      }&amp;autoplay=1`;
    }

    if (question.clue_4_url) {
      clue_4 = `https://www.youtube.com/embed/${
        question.clue_4_url.split("/")[3]
      }&rel=0&amp;controls=0&amp;showinfo=0&amp;start=${
        question.clue_4_start
      }&amp;autoplay=1`;
    }

    return {
      clue_1_url: clue_1,
      clue_1_duration: question.clue_1_duration,
      clue_2_url: clue_2,
      clue_2_duration: question.clue_2_duration,
      clue_3_url: clue_3,
      clue_3_duration: question.clue_3_duration,
      clue_4_url: clue_4,
      clue_4_duration: question.clue_4_duration,
    };
  });

  return embededUrls;
}
