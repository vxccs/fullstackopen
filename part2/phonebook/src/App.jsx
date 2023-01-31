import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState({ message: '', type: '' });

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const showMessage = (message, type) => {
    setErrorMessage({ message, type });
    setTimeout(() => {
      setErrorMessage({ message: '', type: '' });
    }, 5000);
  };

  const updatePerson = (personExists) => {
    const updatedPerson = { ...personExists, number: newNumber };
    return personService
      .update(personExists.id, updatedPerson)
      .then((res) => {
        setPersons(persons.map((p) => (p.id === updatedPerson.id ? res : p)));
        setNewName('');
        setNewNumber('');
        showMessage(`${updatedPerson.name} updated`, 'success');
      })
      .catch((error) => {
        console.error(error);
        showMessage(
          `information of ${personExists.name} has already been removed`,
          'error'
        );
      });
  };

  const addPerson = (e) => {
    e.preventDefault();

    const personExists = persons.find((p) => p.name === newName);
    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added in the phonebook, update number?`
        )
      ) {
        updatePerson(personExists);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((res) => {
        setPersons([...persons, res]);
        setNewName('');
        setNewNumber('');
        showMessage(`${personObject.name} added`, 'success');
      });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          showMessage(`${person.name} removed`, 'success');
        })
        .catch((error) => {
          console.error(error);
          showMessage(`${person.name} could not be removed`, 'error');
        });
    }
  };

  const personsToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>phonebook</h1>
      <Notification errorMessage={errorMessage} />
      <Filter search={search} setSearch={setSearch} />
      <h2>add a number</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
