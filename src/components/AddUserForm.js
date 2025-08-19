import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function AddUserForm() {
  const [name, setName] = useState("");
  const { users, setUsers } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
        id: users.length + 1, 
        name,
        email: "custom@example.com",
        phone: "000-000-0000",
    };

  fetch("http://127.0.0.1:8000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => {
      setUsers([...users, data]); 
      setName("");
    })
    .catch((err) => console.error(err));
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new user"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddUserForm;
