import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Không thể lấy thông tin", err);
      })
  }, [])

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>
            {user.id} | {user.name} | {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList;