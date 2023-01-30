import React from 'react';

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map((person, i) => {
        return (
          <div key={person.name + i}>
            <p>
              {person.name} - {person.number}
              <button onClick={() => removePerson(person)}>delete</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
