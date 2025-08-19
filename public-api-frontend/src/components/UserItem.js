import UserDetails from "./UserDetails";

function UserItem({ user }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{user.name}</h3>
      {/* Prop Drilling (user → UserDetails) */}
      <UserDetails email={user.email} phone={user.phone} />
    </div>
  );
}

export default UserItem;
