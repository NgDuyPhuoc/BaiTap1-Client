import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList.jsx";
import UsersDetail from "./components/UsersDetail.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UsersList />}></Route>
        <Route path="/users/:id" element={<UsersDetail />}></Route>
      </Routes>
    </Router>
  )
}

export default App;