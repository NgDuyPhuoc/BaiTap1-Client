import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Không thể lấy thông tin", err);
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersList;