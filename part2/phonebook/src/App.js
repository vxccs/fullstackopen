import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [personsAll, setPersonsAll] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [Message, setMessage] = useState("");
  const [Type, setType] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersonsAll(initialPersons);
    });
  }, []);

  const showMessage = (message, type) => {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    if (personsAll.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const personToUpdate = personsAll.find((person) => person.name === newName);
        const changedPerson = { ...personToUpdate, number: newNumber };

        personService.update(changedPerson.id, changedPerson).then((returnedPerson) => {
          showMessage(`${changedPerson.name}'s number has been updated.`, "success");
          setPersonsAll(personsAll.map((person) => (person.id !== changedPerson.id ? person : returnedPerson)));
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson).then((returnedPerson) => {
        showMessage(`${newPerson.name} has been added.`, "success");
        setPersonsAll(personsAll.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = (id) => {
    const personToDelete = personsAll.filter((person) => person.id === id)[0];
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id);
      setPersonsAll(personsAll.filter((person) => person.id !== personToDelete.id));
      showMessage(`${personToDelete.name} has been deleted.`, "success");
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPersons(personsAll.filter((person) => person.name.toLowerCase().includes(event.target.value)));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={Message} type={Type} />
      <Filter value={search} onChange={handleSearchChange} />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {search === "" ? (
        <Persons personsToShow={personsAll} onClick={removePerson} />
      ) : (
        <Persons personsToShow={persons} onClick={removePerson} />
      )}
    </div>
  );
};

export default App;
