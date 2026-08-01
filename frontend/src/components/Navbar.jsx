import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaHome, FaPlusCircle, FaList, FaSignOutAlt } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <div className="logo">
                <FaLeaf />
                <span>Smart Agriculture</span>
            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/dashboard">
                        <FaHome /> Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/add-crop">
                        <FaPlusCircle /> Add Crop
                    </Link>
                </li>

                <li>
                    <Link to="/crops">
                        <FaList /> My Crops
                    </Link>
                </li>

                <li>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>

            </ul>

        </nav>

    );

}

export default Navbar;