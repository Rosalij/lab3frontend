
import { NavLink } from "react-router-dom";
import { useAuth, } from "../context/AuthContext";

//header component with navigation
function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-light p-3 border">

      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">

          <ul className="navbar-nav ms-auto flex-row gap-2">
            <li className="nav-item text-light p-2 rounded">
              <NavLink to="/" className="btn btn-primary text-white">Home</NavLink>
            </li>

            <li className="nav-item text-light p-2 rounded">
              {user ? (
                <button onClick={logout} className="btn btn-primary text-white">Log out</button>
              ) : (
                <NavLink to="/login" className="btn btn-primary text-white">Log in</NavLink>
              )}
            </li>

            <li className="nav-item text-light p-2 rounded">
              {user && (
                <NavLink to="/admin" className="btn btn-primary text-white">Admin</NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
