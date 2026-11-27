function UserCard ({name, email, role}) {
    return ( 
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{role}</p>
        </div>
    )
}

export default UserCard;