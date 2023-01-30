import { useState } from 'react';

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all < 1) {
    return <p>no feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" stat={good} />
        <StatisticLine text="neutral" stat={neutral} />
        <StatisticLine text="bad" stat={bad} />
        <StatisticLine text="all" stat={all} />
        <StatisticLine text="average" stat={(good - bad) / all} />
        <StatisticLine text="positive" stat={`${(good / all) * 100}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
