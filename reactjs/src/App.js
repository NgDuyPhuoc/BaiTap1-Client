import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UsersList } from "./components/UsersList.jsx";
import { About } from "./components/About.jsx";
import UserDetail from "./components/UserDetail.jsx";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;