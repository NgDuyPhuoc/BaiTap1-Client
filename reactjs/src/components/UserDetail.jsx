import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserCard } from "./UserCard";

export function UserDetail() {
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
                console.error("Không thể lấy thông tin", err);
            })
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Không tìm thấy thông tin</p>
    }

    return (
        <div>
            {/* {user.map((u) => (
                <UserCard key={u.id} user={u} />
            ))} */}
            <UserCard user={user}></UserCard>
            <Link to={`/users`}>Quay lại</Link>
        </div>
    )
}

export default UserDetail;