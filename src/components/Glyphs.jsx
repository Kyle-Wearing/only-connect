export function Glyphs({ setQuestionNum, choices, setChoises, turn }) {
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
      <h1>{turn} choose a glyph</h1>
      <button onClick={randomQuestions}>placeholder button</button>
    </>
  );
}
