import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UsersList.css"

export function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [viewUsers, setViewUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(3);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("viewedUsers");
        if (saved) {
            setViewUsers(JSON.parse(saved));
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu: ", err);
            setError(true);
            setLoading(false);
        }
    }

    const handleViewUser = (id) => {
        if (!viewUsers.includes(id)) {
            const updatedList = [...viewUsers, id];
            setViewUsers(updatedList);
            localStorage.setItem("viewedUsers", JSON.stringify(updatedList));
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>Có lỗi xảy ra, vui lòng thử lại.</p>
                <button className="reload-btn" onClick={fetchData}>Thử lại</button>
            </div>
        )
    }

    if (!users) {
        return <p>Không có dữ liệu người dùng</p>
    }

    const searchUser = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    const showUs = searchUser.slice(0, showUsers);
    const handleLoadMore = () => {
        setShowUsers((prev) => prev + 3);
    }

    return (
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
                {showUs.map((user, index) => {
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
            {showUsers < searchUser.length && (
                <div className="load-more">
                    <button className="load-more-btn" onClick={handleLoadMore}>Load more</button>
                </div>
            )}
        </div>

    )
}

export default UsersList;