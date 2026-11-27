function Notification({ hasNotifications, count }) {
    return (
        <div>
            {hasNotifications && <span>You have {count} new messages</span>}
            {count > 10 && <span className="urgent">Urgent!</span>}
        </div>
    )
}