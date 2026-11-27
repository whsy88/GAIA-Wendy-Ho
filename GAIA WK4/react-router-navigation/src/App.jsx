import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import UserProfile from "./pages/UserProfile";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = true; // Change to true to allow access

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/admin" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </div>
  )
}

export default App;