import React, { useState } from "react"

const Filter = ({ setSearchQuery }) => {
  return (
    <>
      filter shown with{" "}
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
    </>
  )
}

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAddName,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleAddName}>
          add
        </button>
      </div>
    </form>
  )
}

const Persons = ({ persons, searchQuery }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    ))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const findDuplicate = (name) => {
    return persons.filter((person) => {
      return person.name === name
    })
  }

  const handleAddName = (e) => {
    e.preventDefault()
    if (findDuplicate(newName).length === 1) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const copy = [...persons]
      copy.push({ name: newName, number: newNumber })
      setPersons(copy)
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchQuery={setSearchQuery} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAddName={handleAddName}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  )
}

export default App
