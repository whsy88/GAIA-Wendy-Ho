import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Welcome to the React Router Navigation Demo!</p>

      <h2>Quick Links:</h2>
      <ul>
        <li>
          <Link to="/user-profile/1">View Syazwan's Profile (User 1)</Link>
        </li>
        <li>
          <Link to="/user-profile/2">View Danial's Profile (User 2)</Link>
        </li>
        <li>
          <Link to="/dashboard/overview">Go to Dashboard Overview</Link>
        </li>
        <li>
          <Link to="/admin">Go to Admin Page (Protected)</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;