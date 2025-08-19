import UserDetails from "./UserDetails";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserItem({ user }) {
  const { users, setUsers } = useContext(UserContext);

  const deleteUser = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((u) => u.id !== id)))
      .catch((err) => console.error(err));
  };

  const updateUser = () => {
    const newName = prompt("Enter new name:", user.name);
    if (!newName) return;

    const updatedUser = { ...user, name: newName };
    fetch(`http://127.0.0.1:8000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(users.map((u) => (u.id === data.id ? data : u)));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{user.name}</h3>
      <UserDetails email={user.email} phone={user.phone} />
      <button onClick={() => updateUser()}>Edit</button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
}

export default UserItem;
