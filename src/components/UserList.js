import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserItem from "./UserItem";

function UserList({ loading, setLoading, setError }) {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, [setUsers, setLoading, setError]);

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found</p>;

  return (
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
