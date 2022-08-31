import Person from "./Person";

const Persons = ({ personsToShow, onClick }) => (
  <div>
    <ul>
      {personsToShow.map((person) => (
        <Person person={person} onClick={onClick} key={person.name} />
      ))}
    </ul>
  </div>
);
export default Persons;
