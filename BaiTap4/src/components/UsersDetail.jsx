import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UsersDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Không lấy được thôn tin", err);
            })
    }, [id])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Không tìm thấy thông tin</p>;
    }

    return (
        <div>
            <h3>Chi tiết người dùng</h3>
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Số điện thoại: {user.phone}</p>
            <p>Website: {user.website}</p>

            <Link to={`/users`}>Quay lại</Link>
        </div>
    )
}

export default UsersDetail;