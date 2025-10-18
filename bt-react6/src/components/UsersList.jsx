import axios from "axios";
import { useState, useEffect } from "react";
import "./UsersList.css"

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Không thể lấy danh sách người dùng", err);
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    const searchUser = users.filter(user => user.name.includes(search));

    return (
        <div className="users-wrapper">
            <div className="search">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Nhập tên cần tìm..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="cards-grid">
                {searchUser.map((user, index) => (
                    <div className="card" key={user.id}>
                        <div className="card-index">{index + 1}</div>
                        <div className="card-body">
                            <div className="card-name">{user.name}</div>
                            <div className="card-email">{user.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersList;