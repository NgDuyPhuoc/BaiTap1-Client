import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UsersList.css"

export function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [viewUsers, setViewUsers] = useState([]);

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
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("viewedUsers");
        if (saved) {
            setViewUsers(JSON.parse(saved));
        }
    }, []);

    // 📍 Hàm khi click vào user
    const handleViewUser = (id) => {
        // nếu chưa xem user này thì thêm vào danh sách
        if (!viewUsers.includes(id)) {
            const updatedList = [...viewUsers, id];
            setViewUsers(updatedList);
            localStorage.setItem("viewedUsers", JSON.stringify(updatedList));
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!users) {
        return <p>Không có dữ liệu người dùng</p>
    }

    const searchUser = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            {/* <ul>
                {users.map((user, index) => (
                    <li key={user.id}>
                        {index + 1} |
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul> */}
            <div className="users-wrapper">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Nhập tên cần tìm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="cards-grid">
                    {searchUser.map((user, index) => {
                        const viewed = viewUsers.includes(user.id);
                        return (
                            <div className={`card ${viewed ? "viewed" : ""}`} key={user.id}>
                                <div className="card-index">{index + 1}</div>

                                <div className="card-body">
                                    <Link
                                        to={`/users/${user.id}`}
                                        className="card-link"
                                        onClick={() => handleViewUser(user.id)}
                                    >
                                        {user.name}
                                    </Link>
                                    <p className="card-email">{user.email}</p>
                                    <Link>{viewed ? "Đã xem" : "Xem chi tiết"}</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            );
        </div>
    )
}

export default UsersList;