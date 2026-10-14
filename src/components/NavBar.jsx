import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    console.log(user)
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(removeUser());
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 w-full z-50">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">devTinder</a>
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
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
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