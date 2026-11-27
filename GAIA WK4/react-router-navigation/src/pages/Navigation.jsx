import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                    Home
                    </NavLink>
                </li>
                <li>
                <NavLink to="/UserProfile/1" className= {({ isActive }) => isActive ? 'active' : ''}>
                User Profile (User 1)
                </NavLink> 
                </li>
                <li>
                    <NavLink to="/UserProfile/2" className={({ isActive }) => isActive ? 'active' : ''}>
                    User Profile (User 2)
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;