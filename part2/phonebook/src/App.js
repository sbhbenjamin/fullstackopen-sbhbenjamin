import React, { useState, useEffect } from "react"
import personServices from "./personServices"

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

const Persons = ({ persons, searchQuery, handleDelete }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    ))
}

const Notification = ({ message }) => {
  if (message == null) {
    return null
  } else if (message.success) {
    return <div className="success">{message.message}</div>
  } else {
    return <div className="error">{message.message}</div>
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personServices.getAllPeople().then((persons) => setPersons(persons))
  }, [])

  const findDuplicate = (name) => {
    return persons.filter((person) => {
      return person.name === name
    })
  }

  const handleAddName = (e) => {
    e.preventDefault()
    const duplicate = findDuplicate(newName)

    // update phone number
    if (duplicate.length === 1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {
          name: newName,
          number: newNumber,
        }

        personServices
          .updatePerson(duplicate[0].id, updatedPerson)
          .then((res) => {
            const copy = [...persons]
            const idx = copy.indexOf(duplicate[0])
            copy[idx] = res
            setPersons(copy)

            setNotification({
              success: true,
              message: `Changed ${newName}'s number to ${newNumber}`,
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch((error) => {
            setNotification({
              error: true,
              message: error.response.data.error,
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      // create new entry in phonebook
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personServices
        .createPerson(newPerson)
        .then((resPerson) => {
          const copy = [...persons]
          copy.push(resPerson)
          setPersons(copy)

          setNotification({ success: true, message: `Added ${newName}` })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          setNotification({
            error: true,
            message: error.response.data.error,
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

      setNewName("")
      setNewNumber("")
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .deletePerson(person.id)
        .then((res) => {
          const idx = persons.indexOf(person)
          const copy = [...persons]
          copy.splice(idx, 1)
          setPersons(copy)

          setNotification({
            success: true,
            message: `${person.name} successfully deleted`,
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          setNotification({
            error: true,
            message: `Error removing ${newName} from the phonebook: ${error}`,
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

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
      <Persons
        persons={persons}
        searchQuery={searchQuery}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
