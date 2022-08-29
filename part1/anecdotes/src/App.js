import { useState } from "react";

const Winner = ({ anecdotes, points }) => {
  const mostVotes = Math.max(...points);

  if (mostVotes === 0) {
    return <div>no votes yet</div>;
  }

  const winnerPosition = points.indexOf(mostVotes);
  const winner = anecdotes[winnerPosition];

  return <Anecdote text={winner} points={mostVotes} />;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ text, points }) => {
  return (
    <>
      <div>{text}</div>
      <div>has {points} points</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const clickAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const clickVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <Header text="anecdote of the day" />
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button onClick={clickVote} text="vote" />
      <Button onClick={clickAnecdote} text="next anecdote" />
      <Header text="anecdote with the most votes" />
      <Winner anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
