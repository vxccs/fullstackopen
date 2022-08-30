import Person from "./Person";

const Persons = ({ personsToShow }) => (
  <div>
    <ul>
      {personsToShow.map((person) => (
        <Person person={person} key={person.name} />
      ))}
    </ul>
  </div>
);
export default Persons;
