import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-profile/1" className={({ isActive }) => (isActive ? "active" : "")}>
            User Profile (User 1)
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-profile/2" className={({ isActive }) => (isActive ? "active" : "")}>
            User Profile (User 2)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;