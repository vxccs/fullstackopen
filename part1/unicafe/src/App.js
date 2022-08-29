import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, number, text2 }) => (
  <tr>
    <td>{text}</td>
    <td>
      {number}
      {text2}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <div>no feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" number={good} />
        <StatisticLine text="neutral" number={neutral} />
        <StatisticLine text="bad" number={bad} />
        <StatisticLine text="all" number={total} />
        <StatisticLine text="average" number={average} />
        <StatisticLine text="positive" number={positive} text2="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
