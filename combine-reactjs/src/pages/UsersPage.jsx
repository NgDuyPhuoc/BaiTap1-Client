import axios from "axios";
import { useState, useEffect } from "react";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loadMore, setLoadMore] = useState(3);
    const [viewUser, setViewUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu.", err);
            setError(true);
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return (
            <div className="error-message">
                <p>Có lỗi xảy ra, vui lòng thử lại</p>
                <button className="reload-btn" onClick={fetchData}>Thử lại</button>
            </div>
        )
    }

    if (!users) {
        return <p>Không có dữ liệu người dùng</p>
    }

    const searchUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    const showUsers = viewUser.slice(0, loadMore);

    const handleLoadMore = () => {
        setLoadMore((prev) => prev + 3);
    }


}

export default UsersPage;