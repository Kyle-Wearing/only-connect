export function Sequence({
  questions,
  setCategory,
  team1name,
  team2name,
  setTeam1Score,
  setTeam2Score,
  turn,
  setTurn,
}) {
  console.log(questions);
  return (
    <button
      onClick={() => {
        setCategory("");
      }}
    >
      Sequence
    </button>
  );
}
