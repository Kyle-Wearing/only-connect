import { useEffect } from "react";
import { createQuiz, getQuizzes } from "../../api";

export function Home() {
  useEffect(() => {
    getQuizzes().then((response) => {});
  }, []);
  return <></>;
}
