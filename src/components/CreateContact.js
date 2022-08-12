import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateContact = () => {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  const [isError, setIsError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [key]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.mobileNumber
    ) {
      alert('Enter All the Details');
    } else if (isEditing) {
      let EditedPeople = people.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber,
          };
        }
      });

      setPeople(EditedPeople);
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
      });
      setIsEditing(false);
      setEditId(null);
    } else {
      const addPerson = { ...user, id: uuidv4() };
      let newPeople = [...people, addPerson];
      setPeople(newPeople);
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
      });
    }

    validate(user);
  };

  const deletePerson = (id) => {
    let personDeleted = people.filter((person) => person.id !== id);
    setPeople(personDeleted);
  };

  const updatePerson = (id) => {
    setIsEditing(true);
    let personUpdated = people.find((person) => person.id === id);
    setUser(personUpdated);
    setEditId(id);
  };

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(values.email)) {
      setIsError('This is not a valid email format!');
    }

    const regexExp = /^[6-9]\d{9}$/gi;
    if (!regexExp.test(values.mobileNumber)) {
      setIsError('This is not a valid Mobile Number format!');
    }
  };

  return (
    <main className="form-container">
      <div className="title">
        <h3>Create User</h3>
      </div>
      <form className="form" noValidate onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter Yor First Name"
            value={user.firstName}
            onChange={changeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Your Last Name"
            value={user.lastName}
            onChange={changeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            placeholder="Enter Your Mobile Number"
            value={user.mobileNumber}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="add-btn">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>

      <section className="user-list">
        <div className="contact-list">
          <h3>User list</h3>
        </div>
        <ul className="list">
          {people.map((person) => {
            const { id, firstName, lastName, email, mobileNumber } = person;
            return (
              <li key={id} className="list-item">
                <h2>FirstName: {firstName}</h2>
                <h2>LastName: {lastName}</h2>
                <p>Email: {email}</p>
                <p>MobileNumber: {mobileNumber}</p>
                <div className="btn-cta">
                  <button
                    className="delete-btn"
                    onClick={() => deletePerson(id)}
                  >
                    Remove
                  </button>
                  <button className="edit-btn" onClick={() => updatePerson(id)}>
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default CreateContact;
