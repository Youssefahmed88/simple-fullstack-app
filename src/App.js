import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <UserProvider>
      <div className="App">
        <h1>Users Dashboard 👨‍💻</h1>

        {/* API Users */}
        <UserList loading={loading} setLoading={setLoading} setError={setError} />

        {/* Lifting State Up */}
        <AddUserForm />
      </div>
    </UserProvider>
  );
}

export default App;
