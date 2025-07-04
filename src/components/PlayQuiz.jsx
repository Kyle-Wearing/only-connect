import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PlayQuiz.css";
import { embedYoutubeUrls, getAllQuestions } from "../../utils";
import Lion from "../assets/Lion.png";
import EyeOfHorus from "../assets/EyeOfHorus.png";
import HornedViper from "../assets/HornedViper.png";
import TwistedFlax from "../assets/TwistedFlax.png";
import Tworeeds from "../assets/Tworeeds.png";
import Water from "../assets/Water.png";
import { Connections } from "./Connections";
import { Sequence } from "./Sequence";
import { Images } from "./Images";
import { MissingVowels } from "./MissingVowels";
import { Wall } from "./Wall";
import { Music } from "./Music";

export function PlayQuiz() {
  const { quiz_id } = useParams();
  const [team1name, setTeam1name] = useState("");
  const [team2name, setTeam2name] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [questions, setQuestions] = useState({});
  const [turn, setTurn] = useState(true);
  const [category, setCategory] = useState("");

  const [hieroglyphs, setHieroglyphs] = useState([
    { name: "Lion", src: Lion, disabled: false },
    { name: "Eye of Horus", src: EyeOfHorus, disabled: false },
    { name: "Horned Viper", src: HornedViper, disabled: false },
    { name: "Twisted Flax", src: TwistedFlax, disabled: false },
    { name: "Two Reeds", src: Tworeeds, disabled: false },
    { name: "Water", src: Water, disabled: false },
  ]);
  const [questionTypes, setQuestionTypes] = useState([
    "connections",
    "image",
    "music",
    "sequence",
    "vowels",
    "wall",
  ]);

  async function apiCall() {
    const fetchedQuestions = await getAllQuestions(quiz_id);
    const updatedUrls = embedYoutubeUrls(fetchedQuestions.music);
    fetchedQuestions.music = updatedUrls;
    setQuestions(fetchedQuestions);
  }

  useEffect(() => {
    apiCall();
    const categoryAssignments = [...questionTypes].sort(
      () => Math.random() - 0.5
    );
    setQuestionTypes(categoryAssignments);
  }, []);

  useEffect(() => {
    if (!hieroglyphs.some((el) => el.disabled === false) && category === "") {
      navigate("/quizzes/scores", {
        state: { team1Score, team1name, team2Score, team2name },
      });
    }
  }, [category]);

  function handleSubmit(e) {
    e.preventDefault();
    if (team1name && team2name) {
      setStarted(true);
    }
  }

  function handleClick(index) {
    setHieroglyphs((curr) => {
      const newGlyphs = [...curr];
      newGlyphs[index].disabled = true;
      return newGlyphs;
    });
    setCategory(questionTypes[index]);
  }

  if (!started) {
    return (
      <div className="container">
        <form className="card team-form" onSubmit={handleSubmit}>
          <label>
            Team 1 Name:
            <input
              onChange={(e) => setTeam1name(e.target.value)}
              placeholder="Enter Team 1 Name"
              value={team1name}
              className="input-field"
            />
          </label>
          <label>
            Team 2 Name:
            <input
              onChange={(e) => setTeam2name(e.target.value)}
              placeholder="Enter Team 2 Name"
              value={team2name}
              className="input-field"
            />
          </label>
          <div className="button-group">
            <button type="submit" className="play-button">
              Start Game
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
              className="back-button"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (!category) {
    return (
      <>
        <div className="scoreboard">
          <p className="score">
            {team1name}: <span className="score-value">{team1Score}</span>
          </p>
          <p className="score">
            {team2name}: <span className="score-value">{team2Score}</span>
          </p>
        </div>
        <p className="turn-indicator">
          {turn ? `${team1name} Choose` : `${team2name} Choose`}
        </p>
        <div className="glyph-container">
          {hieroglyphs.map((glyph, index) => {
            return (
              <button
                key={glyph.name}
                disabled={glyph.disabled}
                className="glyph-tile"
                onClick={() => handleClick(index)}
              >
                <img src={glyph.src} alt={glyph.name} className="glyph-img" />
                <p className="glyph-name">{glyph.name}</p>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  const categoryComponents = {
    connections: (
      <Connections
        questions={questions.connections}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
        turn={turn}
        setTurn={setTurn}
      />
    ),
    sequence: (
      <Sequence
        questions={questions.sequence}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
        turn={turn}
        setTurn={setTurn}
      />
    ),
    image: (
      <Images
        questions={questions.image}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
        turn={turn}
        setTurn={setTurn}
      />
    ),
    music: (
      <Music
        questions={questions.music}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
        turn={turn}
        setTurn={setTurn}
      />
    ),
    vowels: (
      <MissingVowels
        questions={questions.vowels}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
      />
    ),
    wall: (
      <Wall
        questions={questions.wall}
        setCategory={setCategory}
        team1name={team1name}
        team2name={team2name}
        setTeam1Score={setTeam1Score}
        setTeam2Score={setTeam2Score}
        turn={turn}
        setTurn={setTurn}
      />
    ),
  };

  return categoryComponents[category];
}
