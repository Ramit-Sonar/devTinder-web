import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    console.log(user)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(removeUser());
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl">devTinder</Link>
            </div>

            {user && <p>Welcome, {user.firstName}</p>}

            {user && <div className="flex gap-2">
                <div className="dropdown dropdown-end mx-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user photo"
                                src={user?.photoUrl}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/profile" className="justify-between" >
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    );
};

export default NavBar;