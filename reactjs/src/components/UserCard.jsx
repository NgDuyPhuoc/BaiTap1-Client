export function UserCard({ user }) {
    return (
        <div>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Tuổi: {user.age}</p>
            <p>Số điện thoại: {user.phone}</p>
            <p>Website: {user.website}</p>
        </div>
    );
}
