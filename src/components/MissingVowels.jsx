export function MissingVowels({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
}) {
  console.log(questions);
  return (
    <button
      onClick={() => {
        setCategory("");
      }}
    >
      Missing Vowels
    </button>
  );
}
