function UserRole({ role }) {
    const renderContent = () => {
        switch (role) {
            case 'admin':
                return <AdminPanel />;
            case 'moderator':
                return <ModeratorPanel />;
            case 'user':
                return <UserPanel />;
            default: 
                return <GuestPanel />;
        }
    };

    return <div>{renderContent()}</div>;
}