const Person = ({ person, onClick }) => (
  <li>
    {person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button>
  </li>
);

export default Person;
