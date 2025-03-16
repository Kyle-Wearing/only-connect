export function Glyphs({ setQuestionNum, choices, setChoises }) {
  function randomQuestions() {
    const rand = Math.floor(Math.random() * choices.length);
    const num = choices[rand];
    setQuestionNum(num);
    setChoises((currChoices) => {
      currChoices.splice(choices.indexOf(num), 1);
      return currChoices;
    });
    return num;
  }

  return (
    <>
      <button onClick={randomQuestions}>generate number</button>
    </>
  );
}
