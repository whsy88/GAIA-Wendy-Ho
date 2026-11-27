function UserGreeting({ isLoggedIn, user }) {
    if (isLoggedIn) {
        return <h1>Welcome back, {user.name}!</h1>;
    } else {
        return <h1>Please log in.</h1>;
    }
}